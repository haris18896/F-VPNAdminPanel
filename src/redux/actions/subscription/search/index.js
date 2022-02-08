import { handleSubscriptionsFetchNoUpdatesVersion } from "../fetch"

export const fetchSubscriptionsSuccessNoUpdatesVersion = (data) => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_SUBSCRIPTIONS_SUCCESS_NO_UPDATES_VERSION,
      payload: data,
    })
  }
}

export const handleSubscriptionsFetchNoUpdates = (
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
  searchKeyword
) => {
  return async (dispatch) => {
    dispatch(
      handleSubscriptionsFetchNoUpdatesVersion(
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
        searchKeyword
      )
    )
  }
}
