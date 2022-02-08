import {
  PAGE_CHANGE_LIST_SUBSCRIPTIONS,
  UPDATE_ON_TRIAL_FILTER_VALUE_LIST_SUBSCRIPTIONS,
} from "../../actionType/subscription/fetch"
import { handleSubscriptionsFetch } from "../fetch"

export const handleOnTrialFilterUpdate = (
  newValue,
  oldValue,
  limit,
  planIdFilterValue,
  autoRenewalFilterValue,
  statusFilterValue,
  startTimeFromFilterValue,
  startTimeToFilterValue,
  expiryTimeFromFilterValue,
  expiryTimeToFilterValue
) => {
  return async (dispatch) => {
    if (newValue !== oldValue) {
      //   dispatch(
      //     handleTransactionsFetch(1, limit, transactionTimeFrom, transactionTimeTo, newValue, modeFilterValue, statusFilterValue)
      //   )

      dispatch(
        handleSubscriptionsFetch(
          1,
          limit,
          planIdFilterValue,
          autoRenewalFilterValue,
          newValue,
          statusFilterValue,
          startTimeFromFilterValue,
          startTimeToFilterValue,
          expiryTimeFromFilterValue,
          expiryTimeToFilterValue
        )
      )

      dispatch({
        type: UPDATE_ON_TRIAL_FILTER_VALUE_LIST_SUBSCRIPTIONS,
        payload: newValue,
      })

      dispatch({ type: PAGE_CHANGE_LIST_SUBSCRIPTIONS, payload: 1 })
    }
  }
}
