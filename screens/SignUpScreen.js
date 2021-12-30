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

const { width: WIDTH } = Dimensions.get("window");

const SignUpScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  const handleSignUpinSignUp = () => {
    auth
      .pass
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  const buttonAlreadyAccount = () => {
    navigation.replace("Login")
  }
  

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/jellyfish.jpg")}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <View>
          <Logo></Logo>
        </View>
        <View style={styles.inputContainer}>
          <Icon
            name={"ios-mail-outline"}
            size={28}
            color={"rgba(255,255,255,0.9)"}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="E-mail Address"
            placeholderTextColor={"rgba(255,255,255,0.9)"}
            underlineColorAndroid="transparent"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon
            name={"ios-key-outline"}
            size={28}
            color={"rgba(255,255,255,0.9)"}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={"rgba(255,255,255,0.9)"}
            underlineColorAndroid="transparent"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleSignUpinSignUp}
            style={[styles.buttonSignUp]}
          >
          <Text 
            style={styles.buttonText}>Sign Up
          </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={buttonAlreadyAccount}
            style={[styles.buttonAlreadyAccount]}
          >
          <Text 
            style={styles.logoText}>Already have an account?
          </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    marginTop: 10,
  },
  inputIcon: {
    position: "absolute",
    top: 8,
    left: 37,
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
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  buttonLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#432577",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonSignUp: {
    width: WIDTH - 150,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#432577",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonAlreadyAccount: {
    width: WIDTH - 150,
    height: 45,
    justifyContent: "center",
    marginTop: -10,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    textAlign: "center",
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  logoText: {
    color: "white",
    fontSize: 16,
    marginTop: 20,
    opacity: 0.8,
    textAlign: "center",
    justifyContent: "center",
  },
})
