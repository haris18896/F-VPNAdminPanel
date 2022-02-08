import { PAGE_CHANGE_LIST_CONNECTION_LOG_DETAILS } from '../../../../actionType/customer'

export const handlePageChangeListConnectionLogsDetails = (page, limit, id) => {
  return async dispatch => {
    const newPage = page.selected + 1
    dispatch({ type: PAGE_CHANGE_LIST_CONNECTION_LOG_DETAILS, payload: newPage })

    dispatch(handleFetchTransactionDetails(id, newPage, limit))
  }
}
