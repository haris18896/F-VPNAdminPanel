import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_SUPPORT_TICKETS_DETAILS_INITIATED,
  FETCH_SUPPORT_TICKETS_DETAILS_SUCCESS,
} from "../../../actionType/customer"

export const initiateFetchSupportTicketsDetails = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_SUPPORT_TICKETS_DETAILS_INITIATED, payload: data })
  }
}

export const fetchSupportTicketsDetailsSuccess = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_SUPPORT_TICKETS_DETAILS_SUCCESS, payload: data })
  }
}

export const handleFetchSupportTicketsDetails = (
  id,
  page = null,
  limit = null
) => {
  return async (dispatch) => {
    dispatch(initiateFetchSupportTicketsDetails())

    try {
      const response = await useJwt.getSupportTicketsDetails(id, page, limit)
      if (response && response.data) {
        dispatch(fetchSupportTicketsDetailsSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
