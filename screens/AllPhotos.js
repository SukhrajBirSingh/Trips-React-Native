import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";

export default function AllPhotos(props) {
  const allPhotos = useSelector((state) => state.places.places);
  //console.log(allPhotos);
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={allPhotos}
          numColumns={3}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <View
              style={{
                flex: 1 / 3,
                margin: 0.5,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Detail", {
                    image: itemData.item.imageUri,
                  });
                }}
              >
                <Image
                  source={{ uri: itemData.item.imageUri }}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: 120,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
}

AllPhotos.navigationOptions = () => {
  return {
    headerShown: true,
    headerTitle: "All Photos",
  };
};
