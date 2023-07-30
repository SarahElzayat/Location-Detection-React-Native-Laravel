import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Modal,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { Context } from "../context/HistoryContext";

const SpotMeScreen = () => {
  const [location, setLocation] = useState(null);
  const [latitude, setLat] = useState(null);
  const [longitude, setLong] = useState(null);
  const { addHistory } = useContext(Context);
  const [active, setActive] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLat(location.coords.latitude);
      setLong(location.coords.longitude);
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          region={{
            latitude,
            longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsPointsOfInterest={false}
          showsCompass={true}
          showsMyLocationButton={true}
        >
          <Marker coordinate={{ longitude, latitude }} />

          <Pressable
            style={styles.button}
            disabled={!active}
            onPress={() => {
              setActive(false);
              addHistory(longitude, latitude, () => {
                Alert.alert("", "Spotted Successfully");
                setActive(true);
              });
            }}
          >
            <Text style={styles.buttonText}>SPOT ME</Text>
          </Pressable>
        </MapView>
      ) : (
        <ActivityIndicator size="large" color="#4072CF" />
      )}
    </View>
  );
};

export default SpotMeScreen;

const styles = StyleSheet.create({
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  coordinate: {
    textAlign: "center",
    borderRadius: 10,
    backgroundColor: "#1F262BC3",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    fontSize: 16,
    padding: 10,
    color: "white",
    fontWeight: "400",
  },

  button: {
    backgroundColor: "#1F262BC3",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 80,
    marginBottom: 20,
    position: "absolute",
    alignSelf: "center",
    bottom: 20,
    paddingHorizontal: 40,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    padding: 10,
    fontWeight: "500",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

    width: "80%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  textInput: {
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "black",
    width: "100%",
    fontSize: 16,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginBottom: 20,
  },
});
