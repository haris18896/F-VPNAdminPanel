import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_COUNTRY_SERVERS_LOAD_STATS_FAILED,
  FETCH_COUNTRY_SERVERS_LOAD_STATS_FAILED_SEARCH,
  FETCH_COUNTRY_SERVERS_LOAD_STATS_INITIATED,
  FETCH_COUNTRY_SERVERS_LOAD_STATS_INITIATED_SEARCH,
  FETCH_COUNTRY_SERVERS_LOAD_STATS_SUCCESS,
  FETCH_COUNTRY_SERVERS_LOAD_STATS_SUCCESS_SEARCH,
} from "../../../../actionType/server/fetch/countryServersLoadStats"
export const fetchCountryServersLoadStatsSuccess = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_COUNTRY_SERVERS_LOAD_STATS_SUCCESS, payload: data })
  }
}

export const fetchCountryServersLoadStatsSuccessSearch = (data) => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_COUNTRY_SERVERS_LOAD_STATS_SUCCESS_SEARCH,
      payload: data,
    })
  }
}

export const handleFetchCountryServersLoadStats = (
  page,
  limit,
  countryIdFilterValue,
  loadFilterType,
  protocolFilterValue,
  cloudIdFilterValue
) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_COUNTRY_SERVERS_LOAD_STATS_INITIATED })
    try {
      const response = await useJwt.getCountryServersLoadStats(
        page,
        limit,
        countryIdFilterValue,
        loadFilterType,
        protocolFilterValue,
        cloudIdFilterValue
      )
      if (response && response.data) {
        // console.log(response.data)
        dispatch(fetchCountryServersLoadStatsSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch({
          type: FETCH_COUNTRY_SERVERS_LOAD_STATS_FAILED,
          payload: err.response,
        })
        console.log(err.response)
      }
    }
  }
}

export const handleFetchCountryServersLoadStatsNoUpdatesVersion = (
  page,
  limit,
  countryIdFilterValue,
  loadFilterType,
  protocolFilterValue,
  cloudIdFilterValue,
  searchKeyword
) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_COUNTRY_SERVERS_LOAD_STATS_INITIATED_SEARCH })
    try {
      const response = await useJwt.getCountryServersLoadStats(
        page,
        limit,
        countryIdFilterValue,
        loadFilterType,
        protocolFilterValue,
        cloudIdFilterValue,
        searchKeyword
      )
      if (response && response.data) {
        // console.log(response.data)
        dispatch(fetchCountryServersLoadStatsSuccessSearch(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch({
          type: FETCH_COUNTRY_SERVERS_LOAD_STATS_FAILED_SEARCH,
          payload: err.response,
        })
        console.log(err.response)
      }
    }
  }
}
