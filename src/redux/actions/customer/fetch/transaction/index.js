import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_TRANSACTION_DETAILS_INITIATED,
  FETCH_TRANSACTION_DETAILS_SUCCESS,
} from "../../../actionType/customer"

export const initiateFetchTransactionDetails = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TRANSACTION_DETAILS_INITIATED, payload: data })
  }
}

export const fetchTransactionDetailsSuccess = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TRANSACTION_DETAILS_SUCCESS, payload: data })
  }
}

export const handleFetchTransactionDetails = (
  id,
  page = null,
  limit = null
) => {
  return async (dispatch) => {
    dispatch(initiateFetchTransactionDetails())

    try {
      const response = await useJwt.getTransactionDetails(id, page, limit)
      if (response && response.data) {
        dispatch(fetchTransactionDetailsSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
