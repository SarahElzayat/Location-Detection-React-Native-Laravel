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
import { Context } from "../context/PlaceContext";

const DragAndDropScreen = () => {
  const [location, setLocation] = useState(null);
  const [latitude, setLat] = useState(null);
  const [longitude, setLong] = useState(null);
  const { addPlace } = useContext(Context);
  const [modalVisible, setModalVisible] = useState(false);
  const [placeName, setName] = useState("");
  const [placeRadius, setRadius] = useState("");

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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="Place name"
              style={styles.textInput}
              placeholderTextColor={"grey"}
              value={placeName}
              autoCorrect={false}
              onChangeText={(n) => setName(n)}
            />
            <TextInput
              placeholder="Radius in meters"
              style={styles.textInput}
              placeholderTextColor={"grey"}
              value={placeRadius}
              keyboardType="numeric"
              onChangeText={(n) => setRadius(n)}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#1F262BC3",
                alignItems: "center",
                borderRadius: 10,
                width: "80%",
              }}
              onPress={() => {
                if (placeName) {
                  addPlace(placeName.trim(), longitude, latitude, placeRadius);
                  Alert.alert("", "Place added successfully");
                }
                setModalVisible(false);
                setName("");
                setRadius("");
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  padding: 10,
                  fontWeight: "500",
                }}
              >
                {placeName && placeRadius ? "SAVE" : "CANCEL"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
          onPress={(l) => {
            // setLocation(l.nativeEvent.coordinate);
            setLat(l.nativeEvent.coordinate["latitude"]);
            setLong(l.nativeEvent.coordinate["longitude"]);
            // setMarker(true);
          }}
        >
          <Marker
            draggable
            coordinate={{ longitude, latitude }}
            onDragEnd={(l) => {
              setLat(l.nativeEvent.coordinate["latitude"]);
              setLong(l.nativeEvent.coordinate["longitude"]);
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text style={styles.coordinate}>
              {`longitude: ${longitude.toFixed(6)}`}
            </Text>
            <Text style={styles.coordinate}>
              {`latitude: ${latitude.toFixed(6)}`}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={styles.buttonText}>SAVE LOCATION</Text>
          </TouchableOpacity>
        </MapView>
      ) : (
        <ActivityIndicator size="large" color="#4072CF" />
      )}
    </View>
  );
};

export default DragAndDropScreen;

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
