import { handleFetchSupportTicketsDetails } from '..'
import { SELECT_CHANGE_TICKETS_LIST_DETAILS, PAGE_CHANGE_LIST_TICKETS_DETAILS } from '../../../../actionType/customer'

export const handleSelectChangeListTicketsDetails = (newLimit, oldLimit, id, page = null) => {
  return async dispatch => {
    if (newLimit !== oldLimit) {
      //   dispatch(handleTransactionsFetch(1, newLimit, statusFilterValue, severityFilterValue))

      dispatch(handleFetchSupportTicketsDetails(id, 1, newLimit))

      dispatch({ type: SELECT_CHANGE_TICKETS_LIST_DETAILS, payload: newLimit })

      dispatch({ type: PAGE_CHANGE_LIST_TICKETS_DETAILS, payload: 1 })
    }
  }
}
