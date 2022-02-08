import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_CUSTOMERS_INITIATED,
  FETCH_CUSTOMERS_INITIATED_NO_UPDATES_VERSION,
  FETCH_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMERS_SUCCESS_NO_UPDATES_VERSION,
} from "../../actionType/customer"

export const fetchCustomersSuccess = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CUSTOMERS_SUCCESS, payload: data })
  }
}

export const handleCustomersFetch = (page, limit, searchKeyword = null) => {
  return async (dispatch) => {
    // HANDLE CUSTOMERS FETCH FUNCTION
    dispatch({ type: FETCH_CUSTOMERS_INITIATED })
    try {
      const response = await useJwt.getCustomers(page, limit, searchKeyword)
      if (response && response.data) {
        dispatch(fetchCustomersSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}

export const handleCustomersFetchNoUpdatesVersion = (
  page,
  limit,
  searchKeyword
) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CUSTOMERS_INITIATED_NO_UPDATES_VERSION })
    try {
      const response = await useJwt.getCustomers(page, limit, searchKeyword)
      if (response && response.data) {
        dispatch({
          type: FETCH_CUSTOMERS_SUCCESS_NO_UPDATES_VERSION,
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
