import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import Icon from "react-native-vector-icons/Ionicons";
import Logo from "../components/Logo";
import Colors from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  KeyboardAvoidingView,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";

export default ({ isChecked, onChecked, ...props }) => {
  return (
    <TouchableOpacity style={styles.checkbox} onPress={onChecked}>
      <Text style={{ color: Colors.lightGray }}>{isChecked ? "✓" : ""}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 25,
    height: 25,
    margin: 5,
    backgroundColor: "#fff0",
    color: Colors.lightGray,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: Colors.gray,
    alignItems: "center",
    justifyContent: "center",
  },
});
