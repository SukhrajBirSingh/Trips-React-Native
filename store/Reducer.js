import { ADD_PICTURE, SET_PLACES } from "./Actions";
import Place from "../models/place";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        places: action.places.map(
          (pl) =>
            new Place(pl.id.toString(), pl.title, pl.imageUri, pl.lat, pl.lng)
        ),
      };
    case ADD_PICTURE:
      const newPlace = new Place(
        action.pictureData.id.toString(), // new Date().toString(),
        action.pictureData.title,
        action.pictureData.image,
        action.pictureData.coords.lat,
        action.pictureData.coords.lng
        //forwarding data
      );

      return {
        places: state.places.concat(newPlace),
      };

    default:
      return state;
  }
};
