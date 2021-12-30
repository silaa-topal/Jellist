import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ExploreScreen from "./screens/ExploreScreen";
import MyListsScreen from "./screens/MyListsScreen";
import ListDetailScreen from "./screens/ListDetailScreen";
import EditList from "./screens/EditList";
// import { Colors } from "react-native/Libraries/NewAppScreen";
import Colors from "./constants/Colors";
// import * as firebase from "firebase";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignUp"
          component={SignUpScreen}
        />
        <Stack.Screen
          options={{ headerShown: true }}
          name="Explore"
          component={ExploreScreen}
        />
        <Stack.Screen name="MyLists" component={MyListsScreen} />
        <Stack.Screen
          name="List Details"
          component={ListDetailScreen}
          options={({ route }) => {
            return {
              title: route.params.title,
              headerStyle: {
                backgroundColor: route.params.color,
              },
              headerTintColor: "white",
            };
          }}
        />
        <Stack.Screen
          name="Edit"
          component={EditList}
          options={({ route }) => {
            return {
              title: route.params.title
                ? `Edit ${route.params.title} list`
                : "Create new list",
              headerStyle: {
                backgroundColor: route.params.color || Colors.darkPurple,
              },
              headerTintColor: "white",
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// firebase.initializeApp(firebaseConfig);
