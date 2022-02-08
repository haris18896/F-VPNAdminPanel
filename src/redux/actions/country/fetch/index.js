import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_CONTINENTS_INITIATED,
  FETCH_CONTINENTS_SUCCESS,
  FETCH_ALL_COUNTRIES_INITIATED,
  FETCH_ALL_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_INITIATED,
  FETCH_COUNTRIES_INITIATED_NO_UPDATES_VERSION,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_SUCCESS_NO_UPDATES_VERSION
} from "../../actionType/country/fetch"

export const initiateFetchContinents = () => ({ type: FETCH_CONTINENTS_INITIATED })

export const fetchContinentsSuccess = (data) => ({ type: FETCH_CONTINENTS_SUCCESS, payload: data })

export const handleContinentsFetch = () => {
  return async (dispatch) => {
    dispatch(initiateFetchContinents())
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

export const initiateFetchCountries = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_COUNTRIES_INITIATED })
  }
}

export const initiateFetchCountriesNoUpdatesVersion = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_COUNTRIES_INITIATED_NO_UPDATES_VERSION })
  }
}

export const fetchCountriesSuccess = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_COUNTRIES_SUCCESS, payload: data })
  }
}

export const fetchCountriesSuccessNoUpdatesVersion = (data) => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_COUNTRIES_SUCCESS_NO_UPDATES_VERSION,
      payload: data,
    })
  }
}

export const handleCountriesFetch = (
  page,
  limit,
  continentFilter,
  searchKeyword = null
) => {
  return async (dispatch) => {
    dispatch(initiateFetchCountries())
    try {
      const response = await useJwt.getCountries(
        page,
        limit,
        continentFilter,
        searchKeyword
      )
      if (response && response.data) {
        dispatch(fetchCountriesSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}

export const handleFetchAllCountriesRecords = (limit) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_ALL_COUNTRIES_INITIATED })
      const response = await useJwt.getAllCountries(limit)
      if (response && response.data) {
        dispatch({ type: FETCH_ALL_COUNTRIES_SUCCESS, payload: response.data })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}

export const handleCountriesFetchNoUpdatesVersion = (
  page,
  limit,
  continentFilter,
  searchKeyword = null
) => {
  return async (dispatch) => {
    dispatch(initiateFetchCountriesNoUpdatesVersion())
    try {
      const response = await useJwt.getCountries(
        page,
        limit,
        continentFilter,
        searchKeyword
      )
      if (response && response.data) {
        dispatch(fetchCountriesSuccessNoUpdatesVersion(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
