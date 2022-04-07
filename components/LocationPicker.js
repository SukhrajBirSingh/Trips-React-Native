import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Button,
  Alert,
  Image,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import LocationPreview from "../components/LocationPreview";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import Env from "../env";

const LocationPicker = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [PickedLocation, setPickedLocation] = useState("");

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    setIsPressed(true);
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      /// ========= Getting Location ==================================
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
        accuracy: Location.Accuracy.Low,
      });

      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      setIsFetching(false);
    } catch (err) {
      Alert.alert("Could not get location!", "Please try again", [
        { text: "Okay" },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <LocationPreview style={styles.mapPreview} gotLocation={PickedLocation}>
        {isFetching ? (
          <ActivityIndicator size="large" />
        ) : (
          <View>
            <View style={styles.icon}>
              <Ionicons name="ios-location-outline" size={40} color="red" />
            </View>
            <Text>Press button to get your location!</Text>
          </View>
        )}
      </LocationPreview>

      <View style={styles.button}>
        {isPressed ? (
          <View></View>
        ) : (
          <Button
            title="Get location"
            onPress={getLocationHandler}
            color={Colors.camera}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapPreview: {
    marginBottom: 10,
    width: 250,
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "white",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.appBackground,
    borderRadius: 15,
  },
});

export default LocationPicker;
