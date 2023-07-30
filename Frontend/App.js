import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PlaceProvider } from "./src/context/PlaceContext";
import { Provider as HistoryProvider } from "./src/context/HistoryContext";
import { StyleSheet } from "react-native";
import LocationScreen from "./src/screens/LocationScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DragAndDropScreen from "./src/screens/DragAndDropScreen";
import MyPlacesScreen from "./src/screens/MyPlacesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, Feather, Entypo } from "@expo/vector-icons";
import SpotMeScreen from "./src/screens/SpotMeScreen";
import HistoryScreen from "./src/screens/HistoryScreen";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
function TabStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textAlign: "center",
          fontSize: 12,
        },
        tabBarStyle: {
          backgroundColor: "#1F262B",
          shadowOpacity: 0,
          borderTopWidth: 0,
          elevation: 0,
          paddingTop: 5,
        },
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#1F262B",
          shadowOpacity: 0,
          elevation: 0,
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#686868",
      }}
      // initialRouteName="History"
    >
      <Tab.Screen
        name="Spot Me"
        component={SpotMeScreen}
        options={{
          title: "SPOT ME",
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="location"
              size={24}
              color={focused ? "white" : "#686868"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add place"
        component={DragAndDropScreen}
        options={{
          title: "ADD PLACE",
          tabBarIcon: ({ focused }) => (
            <Feather
              name="plus"
              size={24}
              color={focused ? "white" : "#686868"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="My places"
        component={MyPlacesScreen}
        options={{
          title: "MY PLACES",
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="building"
              size={24}
              color={focused ? "white" : "#686868"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: "HISTORY",
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="building"
              size={24}
              color={focused ? "white" : "#686868"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <PlaceProvider>
      <HistoryProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#1F262B" },
              headerTintColor: "white",
              headerShown: false,
              headerShadowVisible: false,
              headerTitleStyle: { fontWeight: "400" },
            }}
          >
            <Stack.Screen
              name="TabStack"
              component={TabStack}
              options={{ title: "Home" }}
            />
            <Stack.Screen
              name="Location"
              component={LocationScreen}
              options={{ headerShown: true }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </HistoryProvider>
    </PlaceProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
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
