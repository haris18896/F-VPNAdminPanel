import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_CONNECTION_LOGS_DETAILS_INITIATED,
  FETCH_CONNECTION_LOGS_DETAILS_SUCCESS,
} from "../../../actionType/customer"

export const initiatedFetchConnectionLogsDetails = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CONNECTION_LOGS_DETAILS_INITIATED, payload: data })
  }
}

export const fetchConnectionLogsDetailsSuccess = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CONNECTION_LOGS_DETAILS_SUCCESS, payload: data })
  }
}

export const handleFetchConnectionLogsDetails = (
  id,
  page = null,
  limit = null
) => {
  return async (dispatch) => {
    dispatch(initiatedFetchConnectionLogsDetails())

    try {
      const response = await useJwt.getConnectionLogsDetails(id, page, limit)
      if (response && response.data) {
        dispatch(fetchConnectionLogsDetailsSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
