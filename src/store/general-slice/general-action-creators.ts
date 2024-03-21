import axios from "axios";
import { AppDispatch } from "..";
import { setCities, setCountries, setDistrict } from ".";

const baseUrl = "http://api.geonames.org/";
const userName = "taweeq";

export function callCountries(continentGeonameId: number) {
  return async (dispatch: AppDispatch) => {
    const endPoint = "childrenJSON";

    const response = await axios
      .get(
        `${
          baseUrl + endPoint
        }?username=${userName}&geonameId=${continentGeonameId}&style=short`
      )
      .then(({ data }) => data)
      .catch((error) => alert(error));

    dispatch(setCountries(response.geonames));
  };
}

export function callCities(countryGeonameId: number) {
  return async (dispatch: AppDispatch) => {
    const endPoint = "childrenJSON";

    const response = await axios
      .get(
        `${
          baseUrl + endPoint
        }?username=${userName}&geonameId=${countryGeonameId}`
      )
      .then(({ data }) => data)
      .catch((error) => alert(error));

    dispatch(setCities(response.geonames));
  };
}

export function callDistricts(countryCode: string, adminCode1: string) {
  return async (dispatch: AppDispatch) => {
    const endPoint = "searchJSON";

    const response = await axios
      .get(
        `${
          baseUrl + endPoint
        }?username=${userName}&style=short&maxRows=1000&featureClass=A&featureClass=P&country=${countryCode}&adminCode1=${adminCode1}`
      )
      .then(({ data }) => data)
      .catch((error) => alert(error));

    dispatch(setDistrict(response.geonames));
  };
}
