import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { auth, firestore } from "firebase";
import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../constants/Colors";
import Logo from "../components/Logo";
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
import { Button } from "react-native-web";
import {
  onSnapshot,
  addDoc,
  removeDoc,
  updateDoc,
} from "../services/collections";

const { width: WIDTH } = Dimensions.get("window");

// const MyListsScreen = () => {
//   const navigation = useNavigation();
// };
// const handleExplore = () => {
//   navigation.replace("Explore");
// };

const ListButton = ({ title, color, onPress, onDelete, onOptions }) => {
  return (
    <TouchableOpacity
      style={[styles.itemContainer, { backgroundColor: color }]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.itemTitle}>{title}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={onOptions}>
          <Icon name="pencil" size={24} color="rgba(255,255,255,0.9)" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Icon name="trash" size={24} color="rgba(255,255,255,0.9)" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const renderAddListIcon = (navigation, addItemToLists) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        style={{ justifyContent: "center", marginRight: 4 }}
        onPress={() => navigation.navigate("Settings")}
      >
        <Icon name="settings" size={16} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ justifyContent: "center", marginRight: 8 }}
        onPress={() =>
          navigation.navigate("Edit", { saveChanges: addItemToLists })
        }
      >
        <Text style={styles.inputIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ({ navigation }) => {
  const [lists, setLists] = useState([]);
  const listsRef = firestore()
    .collection("users")
    .doc(auth().currentUser.uid)
    .collection("lists");

  useEffect(() => {
    onSnapshot(
      listsRef,
      (newLists) => {
        setLists(newLists);
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

  const addItemToLists = ({ title, color }) => {
    const index = lists.length > 1 ? lists[lists.length - 1].index + 1 : 0;
    addDoc(listsRef, { title, color, index });
  };

  const removeItemFromLists = (id) => {
    removeDoc(listsRef, id);
  };

  const updateItemFromLists = (id, item) => {
    updateDoc(listsRef, id, item);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => renderAddListIcon(navigation, addItemToLists),
    });
  });

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/jellyfish.jpg")}
    >
      <View style={styles.container}>
        <FlatList
          data={lists}
          renderItem={({ item: { title, color, id, index } }) => {
            return (
              <ListButton
                title={title}
                color={color}
                navigation={navigation}
                onPress={() => {
                  navigation.navigate("List Details", {
                    title,
                    color,
                    listId: id,
                  });
                }}
                onOptions={() => {
                  navigation.navigate("Edit", {
                    title,
                    color,
                    saveChanges: (newItem) =>
                      updateItemFromLists(id, { index, ...newItem }),
                  });
                }}
                onDelete={() => removeItemFromLists(id)}
              />
            );
          }}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Explore");
            }}
            style={[styles.buttonExplore]}
          >
            <Text style={styles.buttonText}>Explore</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Explore")
          }}
          style={[styles.buttonExplore]}
        >
          <Text style={styles.buttonText}>Explore</Text>
        </TouchableOpacity>
      </View> */}

      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleExplore}
          style={[styles.buttonExplore]}
        >
          <Text style={styles.buttonText}>Explore</Text>
        </TouchableOpacity>
      </View> */}
    </ImageBackground>
  );
};
// }

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: null,
    height: null,
  },
  container: {
    flex: 1,
  },
  inputContainer: {
    width: "80%",
    marginTop: 10,
  },
  inputIcon: {
    padding: 5,
    fontSize: 24,
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    color: "rgba(255,255,255,1)",
    marginHorizontal: 25,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },

  buttonExplore: {
    width: WIDTH - 150,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#432577",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    marginLeft: 160,
  },

  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    textAlign: "center",
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },

  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    flex: 1,
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#432577",
  },
  itemTitle: {
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    textAlign: "center",
  },
});
