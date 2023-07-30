import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
// import { Ionicons } from "@expo/vector-icons";

const LocationScreen = ({ route, navigation }) => {
  const { item } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: item.name,
    });
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: item.latitude,
          longitude: item.longitude,
          latitudeDelta: 0.0015,
          longitudeDelta: 0.0015,
        }}
        provider={PROVIDER_GOOGLE}
        // showsTraffic={true}
        showsUserLocation={true}
        showsPointsOfInterest={false}
        showsCompass={true}
        showsMyLocationButton={true}
      >
        <Circle
          center={{
            latitude: item.latitude,
            longitude: item.longitude,
          }}
          radius={item.radius} // Radius in meters (adjust as needed)
          strokeColor={"rgba(0, 0, 255, 0.5)"} // Blue with 50% opacity
          fillColor={"rgba(0, 0, 255, 0.2)"} // Blue with 20% opacity
        />
        <Marker
          coordinate={{
            latitude: item.latitude,
            longitude: item.longitude,
          }}
          title={item.name}
          description={item.name}
        />
      </MapView>
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
