import useJwt from "@src/auth/jwt/useJwt"
import {
  ENABLE_SUBSCRIPTION_INITIATED,
  ENABLE_SUBSCRIPTION_SUCCESS,
} from "../../actionType/subscription/fetch"
import { handleSubscriptionsFetch } from "../fetch"

export const initiateEnableSubscription = () => {
  return (dispatch) => {
    dispatch({ type: ENABLE_SUBSCRIPTION_INITIATED })
  }
}

export const handleEnableSubscription = (
  id,
  page,
  limit,
  planIdFilterValue,
  autoRenewalFilterValue,
  onTrialFilterValue,
  statusFilterValue,
  startTimeFromFilterValue,
  startTimeToFilterValue,
  expiryTimeFromFilterValue,
  expiryTimeToFilterValue
) => {
  return async (dispatch) => {
    try {
      //   alert(id)
      const response = await useJwt.enableSubscription(id)
      if (response && response.data) {
        dispatch(
          handleSubscriptionsFetch(
            page,
            limit,
            planIdFilterValue,
            autoRenewalFilterValue,
            onTrialFilterValue,
            statusFilterValue,
            startTimeFromFilterValue,
            startTimeToFilterValue,
            expiryTimeFromFilterValue,
            expiryTimeToFilterValue
          )
        )
        dispatch({ type: ENABLE_SUBSCRIPTION_SUCCESS, payload: response.data })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
