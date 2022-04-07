import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

const PlaceItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
      <Image style={styles.image} source={{ uri: props.image }} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    //borderBottomColor: Colors.appBorder,
    // borderBottomWidth: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 20,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 20,
    //position: "relative",
  },
  infoContainer: {
    justifyContent: "center",
    //width: "100%",
    alignItems: "center",
    marginLeft: "40%",
    //backgroundColor: "red",
  },
  title: {
    color: "#39AEA9",
    fontSize: 20,
    marginBottom: 5,
    //marginHorizontal: 10,
    // backgroundColor: "green",
    //position: "absolute",
    //top: -50,
    fontWeight: "700",
    //fontStyle: "italic",
    // fontFamily: "bitter-milk",
  },
});

export default PlaceItem;
