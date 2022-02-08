import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_PENDING_CUSTOMERS_FAILED,
  FETCH_PENDING_CUSTOMERS_INITIATED,
  FETCH_PENDING_CUSTOMERS_INITIATED_NO_UPDATES_VERSION,
  FETCH_PENDING_CUSTOMERS_SUCCESS,
  FETCH_PENDING_CUSTOMERS_SUCCESS_NO_UPDATES_VERSION,
} from "../../../actionType/customer"

export const fetchPendingCustomersSuccess = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_PENDING_CUSTOMERS_SUCCESS, payload: data })
  }
}

export const handlePendingCustomersFetch = (
  page,
  limit,
  searchKeyword = null
) => {
  return async (dispatch) => {
    // HANDLE PendingCustomers FETCH FUNCTION
    dispatch({ type: FETCH_PENDING_CUSTOMERS_INITIATED })
    try {
      const response = await useJwt.getPendingCustomers(
        page,
        limit,
        searchKeyword
      )
      if (response && response.data) {
        dispatch(fetchPendingCustomersSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
        dispatch({
          type: FETCH_PENDING_CUSTOMERS_FAILED,
          payload: err.response.data,
        })
      }
    }
  }
}

export const handlePendingCustomersFetchNoUpdatesVersion = (
  page,
  limit,
  searchKeyword
) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_PENDING_CUSTOMERS_INITIATED_NO_UPDATES_VERSION })
    try {
      const response = await useJwt.getPendingCustomers(
        page,
        limit,
        searchKeyword
      )
      if (response && response.data) {
        dispatch({
          type: FETCH_PENDING_CUSTOMERS_SUCCESS_NO_UPDATES_VERSION,
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
