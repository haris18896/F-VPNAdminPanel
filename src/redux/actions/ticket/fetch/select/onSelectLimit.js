import { PAGE_CHANGE_LIST_TICKETS, SELECT_CHANGE_TICKETS_LIST } from '../../../actionType/ticket/fetch'
import { handleTicketsFetch } from '../fetchTicketsActions'

export const handleSelectChangeListTickets = (newLimit, oldLimit, statusFilterValue = null, severityFilterValue = null) => {
  return async dispatch => {
    if (newLimit !== oldLimit) {
      dispatch(handleTicketsFetch(1, newLimit, statusFilterValue, severityFilterValue))

      dispatch({ type: SELECT_CHANGE_TICKETS_LIST, payload: newLimit })

      dispatch({ type: PAGE_CHANGE_LIST_TICKETS, payload: 1 })
    }
  }
}
