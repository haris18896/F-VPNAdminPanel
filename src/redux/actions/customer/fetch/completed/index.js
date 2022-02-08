import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_COMPLETED_CUSTOMERS_INITIATED,
  FETCH_COMPLETED_CUSTOMERS_INITIATED_NO_UPDATES_VERSION,
  FETCH_COMPLETED_CUSTOMERS_SUCCESS,
  FETCH_COMPLETED_CUSTOMERS_SUCCESS_NO_UPDATES_VERSION,
} from "../../../actionType/customer"

export const fetchCompletedCustomersSuccess = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_COMPLETED_CUSTOMERS_SUCCESS, payload: data })
  }
}

export const handleCompletedCustomersFetch = (
  page,
  limit,
  subscriptionStatus,
  planIdFilterValue,
  searchKeyword = null
) => {
  return async (dispatch) => {
    // HANDLE CompletedCustomers FETCH FUNCTION
    dispatch({ type: FETCH_COMPLETED_CUSTOMERS_INITIATED })
    try {
      const response = await useJwt.getCompletedCustomers(
        page,
        limit,
        subscriptionStatus,
        planIdFilterValue
      )
      if (response && response.data) {
        dispatch(fetchCompletedCustomersSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}

export const handleCompletedCustomersFetchNoUpdatesVersion = (
  page,
  limit,
  subscriptionStatus,
  planIdFilterValue,
  searchKeyword
) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_COMPLETED_CUSTOMERS_INITIATED_NO_UPDATES_VERSION })
    try {
      const response = await useJwt.getCompletedCustomers(
        page,
        limit,
        subscriptionStatus,
        planIdFilterValue,
        searchKeyword
      )
      if (response && response.data) {
        dispatch({
          type: FETCH_COMPLETED_CUSTOMERS_SUCCESS_NO_UPDATES_VERSION,
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
