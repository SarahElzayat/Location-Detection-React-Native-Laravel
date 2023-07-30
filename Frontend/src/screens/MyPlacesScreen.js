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
import { Context } from "../context/PlaceContext";
import { MaterialIcons } from "@expo/vector-icons";

const MyPlacesScreen = ({ navigation }) => {
  const { state, getPlaces } = useContext(Context);
  const [loaded, setLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // setLoaded(false);

    getPlaces(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getPlaces(() => setLoaded(true));

    const listener = navigation.addListener("didFocus", () => {
      getPlaces();
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
            scrollEnabled={false}
            ListFooterComponent={() => <View style={{ height: 50 }} />}
            data={state}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Location", { item })}
                >
                  <View
                    style={{
                      backgroundColor: "#1F262BC3",
                      borderRadius: 20,
                      marginVertical: 10,
                      marginHorizontal: 20,
                      padding: 20,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: "400",
                      }}
                    >
                      {item.name}
                    </Text>
                    <MaterialIcons
                      name="arrow-forward-ios"
                      size={24}
                      color="white"
                    />
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
            No Saved Places
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

export default MyPlacesScreen;

const styles = StyleSheet.create({});
