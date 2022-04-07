import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import React from "react";
import { Platform, View } from "react-native";
import PlacesListScreen from "../screens/PlacesListScreen";
import GalleryScreen from "../screens/GalleryScreen";
import CameraScreen from "../screens/CameraScreen";
import Colors from "../constants/Colors";
import DetailScreen from "../screens/DetailScreen";
import AllPhotos from "../screens/AllPhotos";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const defaultStackNavOptions = {
  //headerShown: false,
  // headerStyle: {
  //   backgroundColor: Platform.OS === "android" ? Colors.secondary : "white",
  //   shadowColor: "transparent",
  // },
  // headerTitleStyle: {
  //   //fontFamily: "bitter-milk",
  //   fontSize: 25,
  //   fontWeight: "900",
  // },
  // headerBackTitleStyle: {
  //   fontFamily: "open-sans",
  // },
  // headerTintColor: Platform.OS === "android" ? "white" : "#85C88A",
};

const Navigator = createStackNavigator(
  {
    Places: PlacesListScreen,
    Gallery: GalleryScreen,
    Camera: CameraScreen,
    Detail: DetailScreen,
    AllPhotos: AllPhotos,
  },

  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const allPhotoNavigator = createStackNavigator(
  {
    All: AllPhotos,
  },
  {
    defaultNavigationOptions: { title: "All Photos" },
  }
);

const TabScreen = createBottomTabNavigator(
  {
    Home: {
      screen: Navigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <MaterialCommunityIcons name="home" size={25} color={"#F582A7"} />
          </View>
        ),
      },
    },
    Camera: {
      screen: CameraScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Ionicons
              name="add-circle"
              size={70}
              color={"#F10086"}
              style={{ position: "absolute", top: -48 }}
            />
          </View>
        ),
      },
    },
    AllPhoto: {
      screen: allPhotoNavigator,
      navigationOptions: {
        headerShown: true,
        //headerTitle: "all",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <MaterialCommunityIcons
              name="expand-all"
              size={25}
              color={"#F582A7"}
            />
          </View>
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: "#e91e63",
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: "#eee",
      },
    },
  }
);

export default createAppContainer(TabScreen);
