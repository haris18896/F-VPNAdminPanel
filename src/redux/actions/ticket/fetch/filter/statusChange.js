import { PAGE_CHANGE_LIST_TICKETS, UPDATE_STATUS_FILTER_VALUE } from '../../../actionType/ticket/fetch'
import { handleTicketsFetch } from '../fetchTicketsActions'

export const handleStatusFilterUpdate = (newValue, oldValue, limit, otherFilterValue = null) => {
  return async dispatch => {
    if (newValue !== oldValue) {
      dispatch(handleTicketsFetch(1, limit, newValue, otherFilterValue))

      dispatch({ type: UPDATE_STATUS_FILTER_VALUE, payload: newValue })

      dispatch({ type: PAGE_CHANGE_LIST_TICKETS, payload: 1 })
    }
  }
}
