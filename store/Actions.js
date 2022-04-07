import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../helper/db1";

export const ADD_PICTURE = "ADD_PICTURE";
export const SET_PLACES = "SET_PLACES";

export const addPicture = (title, image, location) => {
  return async (dispatch) => {
    const fileName1 = image.split("/").pop();
    const newPath1 = FileSystem.documentDirectory + fileName1;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath1,
      });
      const dbResult = await insertPlace(
        title,
        newPath1,
        location.lat,
        location.lng
      );
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      // console.log(dbReslt);
      console.log(location);
      dispatch({
        type: ADD_PICTURE,
        pictureData: {
          id: dbResult.insertId,
          title: title,
          image: newPath1,
          coords: {
            lat: location.lat,
            lng: location.lng,
          },
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();

      dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
