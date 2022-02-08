import useJwt from "@src/auth/jwt/useJwt"
import { FETCH_COUNTRIES_BY_CONTINENT_INITIATED, FETCH_COUNTRIES_BY_CONTINENT_SUCCESS } from "../../../actionType/server/fetch/countries"

export const initiateFetchCountries = () => ({ type: FETCH_COUNTRIES_BY_CONTINENT_INITIATED })

export const handleFetchCountriesByContinent = (cloudId, continent) => {
  return async (dispatch) => {
    dispatch(initiateFetchCountries())
    try {
      const response = await useJwt.getCountriesByContinent(cloudId, continent)
      if (response && response.data) {
        dispatch({
          type: FETCH_COUNTRIES_BY_CONTINENT_SUCCESS,
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
