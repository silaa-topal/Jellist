import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ExploreScreen from "./screens/ExploreScreen";
import MyListsScreen from "./screens/MyListsScreen";
import ListDetailScreen from "./screens/ListDetailScreen";
import EditList from "./screens/EditList";
import Settings from "./screens/Settings";
import Colors from "./constants/Colors";
import firebase from "firebase";
// import * as firebase from "firebase";

const Stack = createNativeStackNavigator();
const AuthStack = createStackNavigator();

const AuthScreens = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        // options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
    </AuthStack.Navigator>
  );
};

const Screens = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      /> */}
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name="SignUp"
        component={SignUpScreen}
      />
      <Stack.Screen
        options={{ headerShown: true }}
        name="Explore"
        component={ExploreScreen}
      /> */}
      <Stack.Screen
        name="Explore"
        component={ExploreScreen}
        options={({ route }) => {
          // return {
          //   title: route.params.title,
          //   headerStyle: {
          //     backgroundColor: route.params.color,
          //   },
          //   headerTintColor: "white",
          // };
        }}
      />
      <Stack.Screen name="MyLists" component={MyListsScreen} />
      <Stack.Screen name="Settings" component={Settings} />
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
  );
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (firebase.auth().currentUser) {
      setIsAuthenticated(true);
    }
    firebase.auth().onAuthStateChanged((user) => {
      console.log("Checking auth state...");
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? <Screens /> : <AuthScreens />}
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

// const firebaseConfig = {
//   apiKey: "AIzaSyDEjtwqsNVAr54Mb_tbLWUr6aFclilyGJc",
//   authDomain: "jellist-fab2b.firebaseapp.com",
//   projectId: "jellist-fab2b",
//   storageBucket: "jellist-fab2b.appspot.com",
//   messagingSenderId: "1038283682166",
//   appId: "1:1038283682166:web:546a415dd37864739f0a57",
//   measurementId: "G-N5523782Z6",
// };

// firebase.initializeApp(firebaseConfig);

// if (!firebase.apps.length) {
//   firebase.initializeApp({});
// } else {
//   firebase.app(); // if already initialized, use that one
// }
