import React from "react";
import { Component } from "react";
import { StyleSheet, Image, View } from "react-native";
import logo from "../assets/jellist_logo.png";

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.logoContainer}>
        <Image source={logo} resizeMode={"contain"} style={styles.logoText} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoText: {
    /*color: "pink",
    fontSize: 40,
    fontWeight: "500",
    marginTop: 10,
    opacity: 0.8, */
    width: 250,
    height: 150,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 35,
  },
});