import axios from "axios";
import { AppDispatch } from "..";
import { setPlaces } from "@/store/places-slice";
import { isLoaded, isLoading } from "@/store/general-slice";

const url = "https://google.serper.dev/places";
const headers = {
  "X-API-KEY": "4e5d9165194bc3f47b40fe98df80fbe5d46419db",
  "Content-Type": "application/json",
};

export function getPlaces(q: string, gl: string, autocorrect: boolean) {
  return async (dispatch: AppDispatch) => {
    const data = JSON.stringify({
      q,
      gl,
      autocorrect,
    });

    const config = {
      method: "post",
      url,
      headers,
      data,
    };

    dispatch(isLoading("places"));

    const response = await axios(config)
      .then(({ data }) => data)
      .catch((error) => alert(error));

    dispatch(isLoaded("places"));
    dispatch(setPlaces(response));
  };
}
