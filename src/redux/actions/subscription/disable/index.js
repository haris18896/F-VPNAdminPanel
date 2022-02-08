import useJwt from '@src/auth/jwt/useJwt'
import { DISABLE_SUBSCRIPTION_INITIATED, DISABLE_SUBSCRIPTION_SUCCESS } from '../../actionType/subscription/fetch'
import { handleSubscriptionsFetch } from '../fetch'

export const initiateDisableSubscription = () => {
  return dispatch => {
    dispatch({ type: DISABLE_SUBSCRIPTION_INITIATED })
  }
}

export const handleDisableSubscription = (
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
  return async dispatch => {
    try {
      //   alert(id)
      const response = await useJwt.disableSubscription(id)
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
        dispatch({ type: DISABLE_SUBSCRIPTION_SUCCESS, payload: response.data })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
