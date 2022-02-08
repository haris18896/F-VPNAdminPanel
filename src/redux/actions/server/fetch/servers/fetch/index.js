import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_SERVERS_INITIATED,
  FETCH_SERVERS_INITIATED_NO_UPDATES_VERSION,
  FETCH_SERVERS_SUCCESS,
  FETCH_SERVERS_SUCCESS_NO_UPDATES_VERSION,
} from "../../../../actionType/server/fetch/servers"
import { handleResetServersListFilters } from "../filters/reset"

export const fetchServersSuccess = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_SERVERS_SUCCESS, payload: data })
  }
}

export const handleServersFetch = (
  page,
  limit,
  countryIdFilterValue,
  typeFilterValue,
  protocolFilterValue,
  statusFilterValue,
  cloudIdFilterValue,
  searchkeyword = null
) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_SERVERS_INITIATED })
    try {
      const response = await useJwt.getServers(
        page,
        limit,
        countryIdFilterValue,
        typeFilterValue,
        protocolFilterValue,
        statusFilterValue,
        cloudIdFilterValue,
        searchkeyword
      )
      if (response && response.data) {
        dispatch(fetchServersSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        if (err.response.data.statusCode === 400) {
          dispatch(
            handleResetServersListFilters(
              page,
              limit,
              countryIdFilterValue,
              typeFilterValue,
              protocolFilterValue,
              statusFilterValue,
              cloudIdFilterValue
            )
          )
        }
      }
    }
  }
}

export const handleServersFetchNoUpdatesVersion = (
  page,
  limit,
  countryIdFilterValue,
  typeFilterValue,
  protocolFilterValue,
  statusFilterValue,
  cloudIdFilterValue,
  searchKeyword
) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_SERVERS_INITIATED_NO_UPDATES_VERSION })
    try {
      const response = await useJwt.getServers(
        page,
        limit,
        countryIdFilterValue,
        typeFilterValue,
        protocolFilterValue,
        statusFilterValue,
        cloudIdFilterValue,
        searchKeyword
      )
      if (response && response.data) {
        dispatch({
          type: FETCH_SERVERS_SUCCESS_NO_UPDATES_VERSION,
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
