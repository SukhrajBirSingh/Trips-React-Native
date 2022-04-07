import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const LocationPreview = (props) => {
  return (
    <View style={{ ...styles.mapPreview, ...props.style }}>
      {props.gotLocation ? (
        <View style={styles.mapPreview}>
          <View style={styles.icon}>
            <Ionicons
              name="ios-location-outline"
              size={50}
              color={Colors.camera}
            />
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.text}>Got location!</Text>
            <Text style={styles.text}>You can take picture now!</Text>
          </View>
        </View>
      ) : (
        props.children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 250,
    height: 150,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
  },
});

export default LocationPreview;
