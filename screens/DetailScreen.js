import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

const DetailScreen = (props) => {
  const selectedImage = props.navigation.getParam("image");

  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        setIsPressed(true);
      }}
    >
      <View
        style={{
          // flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isPressed ? "gray" : "#eee",
        }}
      >
        <Image
          style={{
            height: "100%",
            width: "100%",
            resizeMode: "contain",
          }}
          source={{ uri: selectedImage }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default DetailScreen;
