import axios from "axios";
import { AppDispatch } from "@/store";
import { setPlaces } from "@/store/places-slice";
import { isLoaded, isLoading } from "@/store/general-slice";

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
      .get(
        `http://localhost:5500/places?country=${country}&city=${city}&category=${category}`
      )
      .then(({ data }) => data)
      .catch((error) => alert(error));

    dispatch(isLoaded("places"));
    dispatch(setPlaces(response));
  };
};
