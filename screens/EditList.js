import { useNavigation } from "@react-navigation/core";
import { CommonActions } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
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
import ColorSelector from "../components/ColorSelector";

const colorList = [
  "blue",
  "teal",
  "green",
  "olive",
  "yellow",
  "orange",
  "red",
  "pink",
  "purple",
  "blueGray",
];

export default ({ navigation, route }) => {
  const [title, setTitle] = useState(route.params.title || "");
  const [color, setColor] = useState(route.params.color || Colors.darkPurple);
  const [isValid, setValidity] = useState(true);

  return (
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: "row " }}>
          <Text style={styles.label}>List Name</Text>
          {!isValid && (
            <Text style={{ marginLeft: 4, color: Colors.red, fontSize: 12 }}>
              * List name cannot be empty
            </Text>
          )}
        </View>
        <TextInput
          underlineColorAndroid={"transparent"}
          selectionColor={"transparent"}
          autoFocus={true}
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            setValidity(true);
          }}
          placeholder={"New list name"}
          maxLength={30}
          style={[styles.input, { outline: "none" }]}
        />
        <Text style={styles.label}>Choose Color</Text>
        <ColorSelector
          onSelect={(color) => {
            setColor(color);
            navigation.dispatch(CommonActions.setParams({ color }));
          }}
          selectedColor={color}
          colorOptions={colorList}
        />
      </View>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          if (title.length > 1) {
            route.params.saveChanges({ title, color });
            navigation.dispatch(CommonActions.goBack());
          } else {
            setValidity(false);
          }
        }}
      >
        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: null,
    height: null,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: "#fff",
  },
  input: {
    color: Colors.black,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 0.5,
    marginHorizontal: 5,
    padding: 3,
    height: 30,
    fontSize: 24,
  },
  saveButton: {
    borderRadius: 25,
    backgroundColor: Colors.darkGray,
    height: 48,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: Colors.black,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
});
