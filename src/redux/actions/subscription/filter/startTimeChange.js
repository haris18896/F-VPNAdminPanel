// import { UPDATE_SEVERITY_FILTER_VALUE } from '../../../actionType/ticket/fetch'
import { PAGE_CHANGE_LIST_SUBSCRIPTIONS, UPDATE_START_TIME_RANGE_SUBSCRIPTION_LIST } from '../../actionType/subscription/fetch'
import { handleSubscriptionsFetch } from '../fetch'

export const handleUpdateStartTimeRange = (
  from,
  to,
  oldFrom,
  oldTo,
  limit,
  planFilterValue,
  autoRenewalFilterValue,
  onTrialFilterValue,
  statusFilterValue,
  expiryTimeFromFilterValue,
  expiryTimeToFilterValue
) => {
  return async dispatch => {
    if (from !== oldFrom && to !== oldTo) {
      dispatch(
        handleSubscriptionsFetch(
          1,
          limit,
          planFilterValue,
          autoRenewalFilterValue,
          onTrialFilterValue,
          statusFilterValue,
          from,
          to,
          expiryTimeFromFilterValue,
          expiryTimeToFilterValue
        )
      )

      dispatch({ type: UPDATE_START_TIME_RANGE_SUBSCRIPTION_LIST, payload: { from, to } })

      dispatch({ type: PAGE_CHANGE_LIST_SUBSCRIPTIONS, payload: 1 })
    }
  }
}
