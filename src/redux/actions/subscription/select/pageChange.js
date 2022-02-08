import { PAGE_CHANGE_LIST_SUBSCRIPTIONS } from '../../actionType/subscription/fetch'
import { handleSubscriptionsFetch } from '../fetch'
export const handlePageChangeListSubscriptions = (
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
    const newPage = page.selected + 1
    dispatch({ type: PAGE_CHANGE_LIST_SUBSCRIPTIONS, payload: newPage })

    dispatch(
      handleSubscriptionsFetch(
        newPage,
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
  }
}
