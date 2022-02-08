import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_CUSTOMER_DETAILS_INITIATED,
  FETCH_CUSTOMER_DETAILS_SUCCESS,
} from "../../../actionType/customer"

export const initiateFetchCustomerDetails = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CUSTOMER_DETAILS_INITIATED, payload: data })
  }
}

export const fetchCustomerDetailsSuccess = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CUSTOMER_DETAILS_SUCCESS, payload: data })
  }
}

export const handleFetchCustomerDetails = (id, subscriptionStatus) => {
  return async (dispatch) => {
    dispatch(initiateFetchCustomerDetails())

    try {
      const response = await useJwt.getCustomerDetails(id, subscriptionStatus)
      if (response && response.data) {
        dispatch(fetchCustomerDetailsSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
