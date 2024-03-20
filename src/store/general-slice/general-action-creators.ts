import axios from "axios";
import { AppDispatch } from "..";
import { setCities, setStates } from ".";

export function callStates(countryIso: string) {
  return async (dispatch: AppDispatch) => {
    const response = await axios
      .get("http://localhost:5500/api/places/governments/" + countryIso)
      .then(({ data }) => data)
      .catch((error) => alert(error));

    dispatch(setStates(response));
  };
}

export function callCities(countryIso: string, stateIso: string) {
  return async (dispatch: AppDispatch) => {
    const response = await axios
      .get(`http://localhost:5500/api/places/cities/${countryIso}/${stateIso}`)
      .then(({ data }) => data)
      .catch((error) => alert(error));

    dispatch(setCities(response));
  };
}
