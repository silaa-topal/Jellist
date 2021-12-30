import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import Icon from "react-native-vector-icons/Ionicons";
import Logo from "../components/Logo";
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const ExploreScreen = () => {
  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  const handleMyLists = () => {
    navigation.replace("MyLists")
  }

  return (
    <View style={styles.container}>

      <Text>Email: {auth.currentUser?.email}</Text>

      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleMyLists}
        style={styles.button}
      >
        <Text style={styles.buttonText}>My Lists</Text>
      </TouchableOpacity>

    </View>
  )
}

export default ExploreScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})
