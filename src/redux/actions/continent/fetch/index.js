import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_CONTINENTS_INITIATED,
  FETCH_CONTINENTS_SUCCESS,
} from "../../actionType/continent/fetch"
import { FETCH_COUNTRIES_INITIATED } from "../../actionType/country/fetch"

export const initiateFetchCountries = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_COUNTRIES_INITIATED })
  }
}

export const fetchContinentsSuccess = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CONTINENTS_SUCCESS, payload: data })
  }
}

export const handleFetchContinents = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CONTINENTS_INITIATED })
    try {
      const response = await useJwt.getContinents()
      if (response && response.data) {
        dispatch(fetchContinentsSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
