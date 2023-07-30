import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/HistoryContext";
import { Octicons } from "@expo/vector-icons";
const moment = require("moment");

const HistoryScreen = ({ navigation }) => {
  const { state, getHistory } = useContext(Context);
  const [loaded, setLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    getHistory(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getHistory(() => setLoaded(true));

    const listener = navigation.addListener("didFocus", () => {
      getHistory();
    });

    return () => {
      setLoaded(false);
      listener.remove();
    };
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "center",
        alignContent: "center",
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {loaded ? (
        state.length != 0 ? (
          <FlatList
            style={{ flex: 1 }}
            ListFooterComponent={() => <View style={{ height: 50 }} />}
            scrollEnabled={false}
            data={state}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: "#1F262BC3",
                      borderRadius: 20,
                      marginVertical: 10,
                      marginHorizontal: 20,
                      padding: 20,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            color: "white",
                            fontSize: 20,
                            fontWeight: "500",
                          }}
                        >
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            color: "#FFFFFFB0",
                            fontSize: 14,
                            fontWeight: "400",
                            marginTop: 2,
                          }}
                        >
                          {moment(item.created_at).format(
                            "hh:mm A - YYYY-MM-DD"
                          )}
                        </Text>
                        {/* {!item.place_id && (
                          <Text
                            style={{
                              color: "white",
                              fontSize: 14,
                              fontWeight: "400",
                              marginTop: 2,
                            }}
                          >
                            {moment(item.created_at).format(
                              "hh:mm A - YYYY-MM-DD"
                            )}
                          </Text>
                        )} */}
                      </View>

                      <Octicons
                        name="history"
                        size={24}
                        color="white"
                        style={{
                          alignSelf: "center",
                          marginRight: 5,
                        }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <Text
            style={{
              textAlign: "center",
              color: "#7B7676",
              fontSize: 30,
              fontWeight: "300",
            }}
          >
            No History Found
          </Text>
        )
      ) : (
        <ActivityIndicator
          size="large"
          color="#4072CF"
          style={{
            height: "100%",
            marginTop: "90%",
            alignSelf: "center",
            flex: 1,
          }}
        />
      )}
    </ScrollView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({});
