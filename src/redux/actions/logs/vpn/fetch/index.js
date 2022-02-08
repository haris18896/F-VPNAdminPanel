import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_VPN_CONNECTION_LOGS_INITIATED,
  FETCH_VPN_CONNECTION_LOGS_INITIATED_NO_UPDATES_VERSION,
  FETCH_VPN_CONNECTION_LOGS_SUCCESS,
  FETCH_VPN_CONNECTION_LOGS_SUCCESS_NO_UPDATES_VERSION,
} from "../../../actionType/logs/fetch"

export const initiateFetchVpnConnectionLogs = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_VPN_CONNECTION_LOGS_INITIATED })
  }
}

export const fetchVpnConnectionLogsSuccess = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_VPN_CONNECTION_LOGS_SUCCESS, payload: data })
  }
}

export const fetchVpnConnectionLogsSuccessNoUpdatesVersion = (data) => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_VPN_CONNECTION_LOGS_SUCCESS_NO_UPDATES_VERSION,
      payload: data,
    })
  }
}

export const handleFetchVpnConnectionLogs = (
  page,
  limit,
  countryIdFilterValue,
  continentFilterValue,
  connectionTimeFrom,
  connectionTimeTo
) => {
  return async (dispatch) => {
    dispatch(initiateFetchVpnConnectionLogs())

    try {
      const response = await useJwt.getConnectionLogs(
        page,
        limit,
        countryIdFilterValue,
        continentFilterValue,
        connectionTimeFrom,
        connectionTimeTo
      )
      if (response && response.data) {
        dispatch(fetchVpnConnectionLogsSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}

export const handleLogsFetchNoUpdatesVersion = (
  page,
  limit,
  countryIdFilterValue,
  continentFilterValue,
  connectionTimeFrom,
  connectionTimeTo,
  searchKeyword
) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_VPN_CONNECTION_LOGS_INITIATED_NO_UPDATES_VERSION })
    // console.log(page, limit, searchKeyword)

    // dispatch({ type: FETCH_ADMINS_INITIATED_NO_UPDATES_VERSION })
    try {
      const response = await useJwt.getConnectionLogs(
        page,
        limit,
        countryIdFilterValue,
        continentFilterValue,
        connectionTimeFrom,
        connectionTimeTo,
        searchKeyword
      )
      if (response.data) {
        dispatch(fetchVpnConnectionLogsSuccessNoUpdatesVersion(response.data))
      }
    } catch (err) {
      if (err.response) {
        // console.log(err.response)
        console.log(err.response.data)
      }
    }
  }
}
