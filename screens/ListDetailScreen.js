import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { auth, firestore } from "firebase";
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
import {
  onSnapshot,
  addDoc,
  removeDoc,
  updateDoc,
} from "../services/collections";

// eslint
const renderAddListIcon = (addItem) => {
  return (
    <TouchableOpacity onPress={() => addItem()}>
      <Text style={styles.inputIcon}>+</Text>
    </TouchableOpacity>
  );
};

export default ({ navigation, route }) => {
  let [listItems, setListItems] = useState([]);
  const [newItem, setNewItem] = useState();
  const listItemsRef = firestore()
    .collection("users")
    .doc(auth().currentUser.uid)
    .collection("lists")
    .doc(route.params.listId)
    .collection("listItems");

  useEffect(() => {
    onSnapshot(
      listItemsRef,
      (newListItems) => {
        setListItems(newListItems);
      },
      {
        sort: (a, b) => {
          if (a.index < b.index) {
            return -1;
          }
          if (a.index > b.index) {
            return 1;
          }
          return 0;
        },
      }
    );
  }, []);

  const addItemToLists = (item) => {
    // listItems.push(item);
    // setListItems([...listItems]);
    setNewItem({ text: "", isChecked: false, new: true });
  };

  const removeItemFromLists = (index) => {
    listItems.splice(index, 1);
    setListItems([...listItems]);
  };

  // const updateItem = (index, item) => {
  //   listItems[index] = item;
  //   setListItems([...listItems]);
  // };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => renderAddListIcon(addItemToLists),
    });
  });

  if (newItem) {
    listItems = [newItem, ...listItems];
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={listItems}
        renderItem={({ item: { id, text, isChecked, ...params }, index }) => {
          return (
            <ListItem
              {...params}
              text={text}
              isChecked={isChecked}
              // onChecked={() => {
              //   let data = { text, isChecked: !isChecked };
              //   if (id) {
              //     data.id = id;
              //   }
              //   addDoc(listItemsRef, data);
              // }}
              onChangeText={(newText) => {
                if (params.new) {
                  setNewItem({
                    text: newText,
                    isChecked,
                    new: params.new,
                  });
                } else {
                  listItems[index].text = newText;
                  setListItems([...listItems]);
                }
              }}
              onDelete={() => {
                params.new ? setNewItem(null) : removeItemFromLists(index);
                id && removeDoc(listItemsRef, id);
              }}
              onBlur={() => {
                if (text.length > 1) {
                  let data = { text, isChecked };
                  if (id) {
                    data.id = id;
                  }
                  addDoc(listItemsRef, data);
                  params.new && setNewItem(null);
                } else {
                  params.new ? setNewItem(null) : removeItemFromLists(index);
                }
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
