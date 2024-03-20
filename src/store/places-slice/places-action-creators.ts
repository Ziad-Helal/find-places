import axios from "axios";
import { AppDispatch } from "@/store";
import { setCurrentPlace, setPlaces } from "@/store/places-slice";
import { isLoaded, isLoading } from "@/store/general-slice";

export const getPlaces = ({
  country,
  state,
  city,
  category,
}: {
  country: string;
  state: string;
  city: string;
  category: string;
}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(isLoading("places"));

    const response = await axios
      .get(
        `http://localhost:5500/api/places?country=${country}&government=${state}&city=${city}&category=${category}`
      )
      .then(({ data }) => data)
      .catch((error) => alert(error));

    dispatch(setPlaces(response));
    dispatch(isLoaded("places"));
  };
};

export const getPlace = (placeId: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(isLoading("place"));

    const response = await axios
      .get(`http://localhost:5500/api/places/${placeId}`)
      .then(({ data }) => data)
      .catch((error) => alert(error));

    dispatch(setCurrentPlace(response));
    dispatch(isLoaded("place"));
  };
};
