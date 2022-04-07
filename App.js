import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigator from "./navigation/Navigation";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import Reducer from "./store/Reducer";
import { init, deletePlaces } from "./helper/db1";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

init()
  .then(() => {
    console.log("Initialized database");
  })
  .catch((err) => {
    console.log("Initializing Database failed!");
    console.log(err);
  });

//deletePlaces();

const rootReducer = combineReducers({
  places: Reducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "just-wright": require("./constants/fonts/just-wright.ttf"),
    "open-sans": require("./constants/fonts/OpenSans-Bold.ttf"),
    "bitter-milk": require("./constants/fonts/Bittermilk.ttf"),
    Ionicons: require("@expo/vector-icons"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={() => {}}
      />
    );
  }
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
