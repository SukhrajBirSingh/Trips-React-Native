import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import PlaceItem from "../components/PlaceItem";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as Actions from "../store/Actions";
import Colors from "../constants/Colors";

import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

const PlacesListScreen = (props) => {
  //const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch();
  const selectedPlace = useSelector((state) =>
    state.places.places.filter(
      (place, index, self) =>
        index === self.findIndex((t) => t.title === place.title)
    )
  );

  //const allplaces = useSelector((state) => state.places.places);

  //console.log(allplaces);

  useEffect(() => {
    dispatch(Actions.loadPlaces());
  }, [dispatch]);
  // console.log(selectedPlace);
  return (
    <SafeAreaView style={styles.content}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "600",
          color: "#F10086",
          marginHorizontal: 15,
          // backgroundColor: "#F4FCD9",
        }}
      >
        Your
      </Text>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "600",
          color: "#F10086",
          marginHorizontal: 15,
          //backgroundColor: "#F4FCD9",
        }}
      >
        Memories
      </Text>

      <FlatList
        data={selectedPlace}
        // extraData={places}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <PlaceItem
            title={itemData.item.title}
            image={itemData.item.imageUri}
            onSelect={() => {
              props.navigation.navigate("Gallery", {
                placeId: itemData.item.id,
                placeTitle: itemData.item.title,
              });
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

PlacesListScreen.navigationOptions = (navDAta) => {
  return {
    headerShown: false,
    //headerTitle: "Your Memories",
    // fontFamily: "just-wright",
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "#eee",
    marginTop: 10,
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#DFDFDE",
    marginTop: 20,
    marginHorizontal: 10,
    // paddingHorizontal: 20,
    borderRadius: 20,
    //overflow: "hidden",
    // borderTopColor: Colors.appBorder,
    // borderTopWidth: 1,
    //height: 90,
    // position: "absolute",
    //bottom: 50,
    //width: "80%",
  },
  icon: {
    //top: -49,
    // alignItems: "center",
    // justifyContent: "center",
    //position: "absolute",
  },
});

export default PlacesListScreen;
