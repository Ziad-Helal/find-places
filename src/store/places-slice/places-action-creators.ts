import axios from "axios";
import { AppDispatch } from "@/store";
import { setPlaces } from "@/store/places-slice";
import { isLoaded, isLoading } from "@/store/general-slice";

// https://maps.googleapis.com/maps/api/place/textsearch/json?query=retaurants+in+cairo,+egypt&key=AIzaSyBYzoQ-PfTHOEfb9vIIfz6-7i8RJh2iYBE

export const getPlaces = ({
  country,
  city,
  category,
}: {
  country: string;
  city: string;
  category: string;
}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(isLoading("places"));

    const response = await axios
      .get("https://e389-156-214-244-174.ngrok-free.app/api/blogs", {
        data: {
          country,
          city,
          category,
        },
      })
      .then(({ data }) => data)
      .catch((error) => console.log(error));
    console.log(response);

    dispatch(isLoaded("places"));
    dispatch(setPlaces(response));
  };
};
