import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_SUBSCRIPTIONS_INITIATED,
  FETCH_SUBSCRIPTIONS_INITIATED_NO_UPDATES_VERSION,
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FETCH_SUBSCRIPTIONS_SUCCESS_NO_UPDATES_VERSION,
} from "../../actionType/subscription/fetch"

export const fetchSubscriptionsSuccess = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_SUBSCRIPTIONS_SUCCESS, payload: data })
  }
}

export const handleSubscriptionsFetch = (
  page,
  limit,
  planIdFilterValue,
  autoRenewalFilterValue,
  onTrialFilterValue,
  statusFilterValue,
  startTimeFromFilterValue,
  startTimeToFilterValue,
  expiryTimeFromFilterValue,
  expiryTimeToFilterValue,
  searchkeyword = null
) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_SUBSCRIPTIONS_INITIATED })
    try {
      const response = await useJwt.getSubscriptions(
        page,
        limit,
        planIdFilterValue,
        autoRenewalFilterValue,
        onTrialFilterValue,
        statusFilterValue,
        startTimeFromFilterValue,
        startTimeToFilterValue,
        expiryTimeFromFilterValue,
        expiryTimeToFilterValue,
        searchkeyword
      )
      if (response && response.data) {
        dispatch(fetchSubscriptionsSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}

export const handleSubscriptionsFetchNoUpdatesVersion = (
  page,
  limit,
  planIdFilterValue,
  autoRenewalFilterValue,
  onTrialFilterValue,
  statusFilterValue,
  startTimeFromFilterValue,
  startTimeToFilterValue,
  expiryTimeFromFilterValue,
  expiryTimeToFilterValue,
  searchkeyword = null
) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_SUBSCRIPTIONS_INITIATED_NO_UPDATES_VERSION })
    try {
      const response = await useJwt.getSubscriptions(
        page,
        limit,
        planIdFilterValue,
        autoRenewalFilterValue,
        onTrialFilterValue,
        statusFilterValue,
        startTimeFromFilterValue,
        startTimeToFilterValue,
        expiryTimeFromFilterValue,
        expiryTimeToFilterValue,
        searchkeyword
      )
      if (response && response.data) {
        dispatch({
          type: FETCH_SUBSCRIPTIONS_SUCCESS_NO_UPDATES_VERSION,
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
