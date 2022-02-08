import {
  PAGE_CHANGE_LIST_CONNECTION_LOG_DETAILS,
  SELECT_CHANGE_CONNECTION_LOG_LIST_DETAILS,
} from "../../../../actionType/customer"

export const handleSelectChangeListConnectionLogsDetails = (
  newLimit,
  oldLimit,
  id
) => {
  return async (dispatch) => {
    if (newLimit !== oldLimit) {
      dispatch(handleFetchConnectionLogsDetails(id, 1, newLimit))

      dispatch({
        type: SELECT_CHANGE_CONNECTION_LOG_LIST_DETAILS,
        payload: newLimit,
      })

      dispatch({ type: PAGE_CHANGE_LIST_CONNECTION_LOG_DETAILS, payload: 1 })
    }
  }
}
