import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_CITIES_INITIATED,
  FETCH_CITIES_INITIATED_NO_UPDATES_VERSION,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_SUCCESS_NO_UPDATES_VERSION,
  FETCH_CITY_INITIATED,
  FETCH_CITY_SUCCESS,
} from "../../actionType/city/fetch"

export const initiateFetchCities = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CITIES_INITIATED })
  }
}

export const initiateFetchCity = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CITY_INITIATED })
  }
}

export const fetchCitySuccess = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CITY_SUCCESS, payload: data })
  }
}

export const initiateFetchCitiesNoUpdatesVersion = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CITIES_INITIATED_NO_UPDATES_VERSION })
  }
}

export const fetchCitiesSuccess = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CITIES_SUCCESS, payload: data })
  }
}

export const fetchCitiesSuccessNoUpdatesVersion = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CITIES_SUCCESS_NO_UPDATES_VERSION, payload: data })
  }
}

export const handleCitiesFetch = (
  page,
  limit,
  countryIdFilterValue,
  continentFilterValue,
  searchKeyword = null
) => {
  return async (dispatch) => {
    dispatch(initiateFetchCities())
    try {
      const response = await useJwt.getCities(
        page,
        limit,
        countryIdFilterValue,
        continentFilterValue,
        searchKeyword
      )
      if (response && response.data) {
        // console.log(response.data)
        dispatch(fetchCitiesSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}

export const handleCitiesFetchNoUpdatesVersion = (
  page,
  limit,
  countryIdFilterValue,
  continentFilterValue,
  searchKeyword = null
) => {
  return async (dispatch) => {
    dispatch(initiateFetchCitiesNoUpdatesVersion())

    try {
      const response = await useJwt.getCities(
        page,
        limit,
        countryIdFilterValue,
        continentFilterValue,
        searchKeyword
      )
      if (response && response.data) {
        // console.log(response.data)
        dispatch(fetchCitiesSuccessNoUpdatesVersion(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}

export const handleCityFetch = (id) => {
  return async (dispatch) => {
    dispatch(initiateFetchCity())

    try {
      const response = await useJwt.getCity(id)
      if (response && response.data) {
        dispatch(fetchCitySuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
