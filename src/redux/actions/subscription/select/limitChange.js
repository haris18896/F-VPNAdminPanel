import { PAGE_CHANGE_LIST_SUBSCRIPTIONS, SELECT_CHANGE_SUBSCRIPTIONS_LIST } from '../../actionType/subscription/fetch'
import { handleSubscriptionsFetch } from '../fetch'

export const handleSelectChangeListSubsciptions = (
  newLimit,
  oldLimit,
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
    if (newLimit !== oldLimit) {
      dispatch(
        handleSubscriptionsFetch(
          1,
          newLimit,
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

      dispatch({ type: SELECT_CHANGE_SUBSCRIPTIONS_LIST, payload: newLimit })

      dispatch({ type: PAGE_CHANGE_LIST_SUBSCRIPTIONS, payload: 1 })
    }
  }
}
