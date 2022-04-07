import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Button,
} from "react-native";
import LocationPicker from "../components/LocationPicker";
import { Ionicons } from "@expo/vector-icons";
import * as Actions from "../store/Actions";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import Env from "../env";

const CameraScreen = (props) => {
  const dispatch = useDispatch();

  const [selectedLocation, setSelectedLocation] = useState();
  // const [selectedImage, setSelectedImage] = useState();
  // const [selectedTitle, setSelectedTitle] = useState("");
  const locationPickedHandler = useCallback(
    (location) => {
      setSelectedLocation(location);
    },
    [setSelectedLocation]
  );

  //console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@");
  //console.log(selectedLocation);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL,
      Permissions.LOCATION
    );

    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "Yoy need to grant camera and location permission to use this app!",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const cameraHandler = async () => {
    const hasPermissions = await verifyPermissions();

    if (!hasPermissions) {
      return;
    }

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    // ================== Getting formatted address using google geocode api=============
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${selectedLocation.lat}&lon=${selectedLocation.lng}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const resData = await response.json();
    if (!resData) {
      throw new Error("Something went wrong");
    }
    // console.log(resData);
    const address = resData.display_name;

    //console.log(address);

    dispatch(Actions.addPicture(address, image.uri, selectedLocation));
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.centerView}>
        <LocationPicker
          onLocationPicked={locationPickedHandler}
        ></LocationPicker>
      </View>

      <View style={styles.bottomBar}>
        <View style={styles.icon}>
          <TouchableOpacity onPress={cameraHandler}>
            <Ionicons name="camera-outline" size={60} color={Colors.camera} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  centerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },

  bottomBar: {
    // marginBottom: 70,
    alignItems: "center",
    borderTopColor: "#eee",
    backgroundColor: "#eee",
    borderTopWidth: 1,
    height: 90,
    position: "relative",
  },
  icon: {
    position: "absolute",
    top: -30,
  },
});

export default CameraScreen;
