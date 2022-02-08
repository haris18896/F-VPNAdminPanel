import {
  PAGE_CHANGE_LIST_SUBSCRIPTIONS,
  UPDATE_EXPIRY_TIME_RANGE_SUBSCRIPTION_LIST,
} from "../../actionType/subscription/fetch"
import { handleSubscriptionsFetch } from "../fetch"

export const handleUpdateExpiryTimeRange = (
  from,
  to,
  oldFrom,
  oldTo,
  limit,
  planIdFilterValue,
  autoRenewalFilterValue,
  onTrialFilterValue,
  statusFilterValue,
  startTimeFromFilterValue,
  startTimeToFilterValue
) => {
  return async (dispatch) => {
    if (from !== oldFrom && to !== oldTo) {
      dispatch(
        handleSubscriptionsFetch(
          1,
          limit,
          planIdFilterValue,
          autoRenewalFilterValue,
          onTrialFilterValue,
          statusFilterValue,
          startTimeFromFilterValue,
          startTimeToFilterValue,
          from,
          to
        )
      )

      dispatch({
        type: UPDATE_EXPIRY_TIME_RANGE_SUBSCRIPTION_LIST,
        payload: { from, to },
      })

      dispatch({ type: PAGE_CHANGE_LIST_SUBSCRIPTIONS, payload: 1 })
    }
  }
}
