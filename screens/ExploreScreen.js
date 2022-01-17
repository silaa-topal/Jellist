import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
// import { auth } from "../firebase";
import { auth, firestore } from "firebase";
import Icon from "react-native-vector-icons/Ionicons";
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
import {
  onSnapshot,
  addDoc,
  removeDoc,
  updateDoc,
} from "../services/collections";
import { collection, getDocs } from "firebase/firestore";

// const ExploreScreen = () => {

// const handleSignOut = () => {
//   auth
//     .signOut()
//     .then(() => {
//       navigation.replace("Login");
//     })
//     .catch((error) => alert(error.message));
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
    </TouchableOpacity>
  );
};

export default ({ navigation }) => {
  // const navigation = useNavigation();

  const handleMyLists = () => {
    navigation.replace("MyLists");
  };

  // const auth = getAuth();

  // const listAllUsers = (nextPageToken) => {
  //   // List batch of users, 1000 at a time.
  //   auth
  //     .listUsers(1000, nextPageToken)
  //     .then((listUsersResult) => {
  //       listUsersResult.users.forEach((userRecord) => {
  //         console.log("user", userRecord.toJSON());
  //       });
  //       if (listUsersResult.pageToken) {
  //         // List next batch of users.
  //         listAllUsers(listUsersResult.pageToken);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Error listing users:", error);
  //     });
  // };
  // // Start listing users from the beginning, 1000 at a time.
  // listAllUsers();

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

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/jellyfish.jpg")}
    >
      <View View style={styles.container}>
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
                // onOptions={() => {
                //   navigation.navigate("Edit", {
                //     title,
                //     color,
                //     saveChanges: (newItem) =>
                //       updateItemFromLists(id, { index, ...newItem }),
                //   });
                // }}
                // onDelete={() => removeItemFromLists(id)}
              />
            );
          }}
        />

        {/* <View style={styles.container}>
        <Text>Email: {auth.currentUser?.email}</Text> */}

        {/* <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity> */}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleMyLists}
            style={styles.buttonMyLists}
          >
            <Text style={styles.buttonText}>My Lists</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </View> */}
    </ImageBackground>
  );
};
// };

// export default ExploreScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: null,
    height: null,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    textAlign: "center",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },

  buttonMyLists: {
    width: "60%",
    height: 45,
    borderRadius: 25,
    backgroundColor: "#432577",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    marginLeft: 150,
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
    width: 300,
  },
  itemTitle: {
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    textAlign: "center",
  },
});
