import {
  PAGE_CHANGE_LIST_SUBSCRIPTIONS,
  UPDATE_STATUS_FILTER_VALUE_LIST_SUBSCRIPTIONS,
} from "../../actionType/subscription/fetch"
import { handleSubscriptionsFetch } from "../fetch"

export const handleStatusFilterUpdate = (
  newValue,
  oldValue,
  limit,
  planIdFilterValue,
  autoRenewalFilterValue,
  onTrialFilterValue,
  startTimeFromFilterValue,
  startTimeToFilterValue,
  expiryTimeFromFilterValue,
  expiryTimeToFilterValue
) => {
  return async (dispatch) => {
    if (newValue !== oldValue) {
      dispatch(
        handleSubscriptionsFetch(
          1,
          limit,
          planIdFilterValue,
          autoRenewalFilterValue,
          onTrialFilterValue,
          newValue,
          startTimeFromFilterValue,
          startTimeToFilterValue,
          expiryTimeFromFilterValue,
          expiryTimeToFilterValue
        )
      )

      dispatch({
        type: UPDATE_STATUS_FILTER_VALUE_LIST_SUBSCRIPTIONS,
        payload: newValue,
      })

      dispatch({ type: PAGE_CHANGE_LIST_SUBSCRIPTIONS, payload: 1 })
    }
  }
}
