import { PAGE_CHANGE_LIST_SUBSCRIPTIONS, RESET_SUBSCRIPTIONS_LIST_FILTERS } from '../../actionType/subscription/fetch'
import { handleSubscriptionsFetch } from '../fetch'

export const handleResetSubscriptionsListFilters = (
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
    if (
      (startTimeFromFilterValue && startTimeToFilterValue) ||
      (expiryTimeFromFilterValue && expiryTimeToFilterValue) ||
      planIdFilterValue ||
      autoRenewalFilterValue ||
      statusFilterValue ||
      onTrialFilterValue
    ) {
      dispatch({ type: RESET_SUBSCRIPTIONS_LIST_FILTERS })

      dispatch(handleSubscriptionsFetch(1, limit, '', '', '', '', '', '', '', ''))

      dispatch({ type: PAGE_CHANGE_LIST_SUBSCRIPTIONS, payload: 1 })
    }
  }
}
