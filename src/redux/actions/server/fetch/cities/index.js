import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_CITIES_BY_COUNTRY_INITIATED,
  FETCH_CITIES_BY_COUNTRY_SUCCESS,
} from "../../../actionType/server/fetch/cities"

export const initiateFetchCities = () => ({ type: FETCH_CITIES_BY_COUNTRY_INITIATED })

export const handleFetchCitiesByCountry = (cloudId, country) => {
  return async (dispatch) => {
    dispatch(initiateFetchCities())
    try {
      const response = await useJwt.getCitiesByCountry(cloudId, country)
      if (response && response.data) {
        dispatch({
          type: FETCH_CITIES_BY_COUNTRY_SUCCESS,
          payload: response.data,
        })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
