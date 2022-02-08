import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_SUBSCRIPTION_DETAILS_INITIATED,
  FETCH_SUBSCRIPTION_DETAILS_SUCCESS,
} from "../../../actionType/customer"

export const initiatedFetchSubscriptionDetails = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_SUBSCRIPTION_DETAILS_INITIATED, payload: data })
  }
}

export const fetchSubscriptionDetailsSuccess = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_SUBSCRIPTION_DETAILS_SUCCESS, payload: data })
  }
}

export const handleFetchSubscriptionDetails = (id, subscriptionStatus) => {
  return async (dispatch) => {
    dispatch(initiatedFetchSubscriptionDetails())

    try {
      const response = await useJwt.getSubscriptionDetails(
        id,
        subscriptionStatus
      )

      if (response && response.data) {
        console.log(response.data)
        dispatch(fetchSubscriptionDetailsSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
