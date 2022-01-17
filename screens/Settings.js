import React from "react";
import { auth } from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";
import {
  View,
  KeyboardAvoidingView,
  ImageBackground,
  StyleSheet,
} from "react-native";

export default () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Button
        text="Log out"
        onPress={() => {
          auth().signOut();
        }}
      />
    </View>
  );
};
