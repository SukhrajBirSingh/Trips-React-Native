import React from "react";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";
import Env from "../env";

const GalleryScreen = (props) => {
  const placeTitle = props.navigation.getParam("placeTitle");
  const placeId = props.navigation.getParam("placeId");
  const selectedPlace = useSelector((state) =>
    state.places.places.filter((place) => place.title === placeTitle)
  );

  let imagePreviewUrl;

  if (selectedPlace[0].lat) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${selectedPlace[0].lat},${selectedPlace[0].lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${selectedPlace[0].lat},${selectedPlace[0].lng}&key=${Env.googleApiKey}`;
  }
  return (
    <View style={styles.container}>
      <View style={styles.map}>
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      </View>
      <View
        style={{
          marginBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: "lightgray",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginLeft: "30%",
            marginVertical: 5,
            color: "#F10086",
          }}
          numberOfLines={1}
        >
          {placeTitle}
        </Text>
      </View>

      <FlatList
        data={selectedPlace}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <View
            style={{
              flex: 1 / 3,
              flexDirection: "column",
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
                style={styles.thumbnail}
                source={{ uri: itemData.item.imageUri }}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};
//Image style={styles.image} source={{ uri: selectedPlace.imageUri }}

GalleryScreen.navigationOptions = (navData) => {
  return {
    headerShown: false, //headerTitle: navData.navigation.getParam("placeTitle"),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    //padding: 5,
    backgroundColor: "#eee",
    //justifyContent: "center",
  },
  thumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: 120,
    //marginHorizontal: 1,
    // marginTop: 10,
  },
  mapImage: {
    height: 200,
    width: "100%",
    borderRadius: 30,

    //padding: 10,
    // borderRadius: 20,
  },
  map: {
    alignContent: "center",
    justifyContent: "center",
    paddingBottom: 5,
    //marginHorizontal: 20,
    //marginVertical: 10,
  },
});

export default GalleryScreen;
