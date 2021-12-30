import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState, useLayoutEffect } from "react";
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
  FlatList,
} from "react-native";
import ListItem from "../components/ListItem";

// eslint
const renderAddListIcon = (addItem) => {
  return (
    <TouchableOpacity
      onPress={() => addItem({ text: "", isChecked: false, isNewItem: true })}
    >
      <Text style={styles.inputIcon}>+</Text>
    </TouchableOpacity>
  );
};

export default ({ navigation }) => {
  const [listItems, setListItems] = useState([]);
  const addItemToLists = (item) => {
    listItems.push(item);
    setListItems([...listItems]);
  };

  const removeItemFromLists = (index) => {
    listItems.splice(index, 1);
    setListItems([...listItems]);
  };

  const updateItem = (index, item) => {
    listItems[index] = item;
    setListItems([...listItems]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => renderAddListIcon(addItemToLists),
    });
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={listItems}
        renderItem={({ item: { text, isChecked, isNewItem }, index }) => {
          return (
            <ListItem
              text={text}
              isChecked={isChecked}
              isNewItem={isNewItem}
              onChecked={() => {
                const listItem = listItems[index];
                listItem.isChecked = !isChecked;
                updateItem(index, listItem);
              }}
              onChangeText={(newText) => {
                const listItem = listItems[index];
                listItem.text = newText;
                updateItem(index, listItem);
              }}
              onDelete={() => {
                removeItemFromLists(index);
              }}
            />
          );
        }}
      />
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
  },
  inputIcon: {
    padding: 5,
    fontSize: 32,
    color: "white",
  },
});
