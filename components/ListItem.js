import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import Icon from "react-native-vector-icons/Ionicons";
import Logo from "../components/Logo";
import Colors from "../constants/Colors";
import Checkbox from "./Checkbox";
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
import { textDecorationColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const EditableText = ({ isChecked, onChangeText, text, ...props }) => {
  const [isEditMode, setEditMode] = useState(props.new);
  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() => !isChecked && setEditMode(true)}
    >
      {isEditMode ? (
        <TextInput
          underlineColorAndroid={"transparent"}
          selectionColor={"transparent"}
          autoFocus={true}
          value={text}
          onChangeText={onChangeText}
          onSubmitEditing={() => {}}
          placeholder={"Add new item here"}
          maxLength={30}
          style={[styles.input, { outline: "none" }]}
          onBlur={() => {
            props.onBlur && props.onBlur();
            setEditMode(false);
          }}
        />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: isChecked ? Colors.lightGray : Colors.black,
              // textDecoration: isChecked ? "linethrough" : "none",
            },
          ]}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};
export default ({
  text,
  isChecked,
  onChecked,
  onChangeText,
  onDelete,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", flex: 1 }}>
        {/* <Checkbox isChecked={isChecked} onChecked={onChecked} /> */}
        <EditableText
          text={text}
          onChangeText={onChangeText}
          isChecked={isChecked}
          {...props}
        />
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Icon name="trash" size={20} color={Colors.darkPurple} />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  inputIcon: {
    padding: 5,
    fontSize: 16,
  },
  input: {
    color: Colors.black,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 0.5,
    marginHorizontal: 5,
    padding: 3,
    height: 25,
    fontSize: 16,
  },
  text: {
    padding: 6,
    fontSize: 16,
  },
});
