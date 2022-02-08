import { PAGE_CHANGE_LIST_TICKETS, UPDATE_SEVERITY_FILTER_VALUE } from '../../../actionType/ticket/fetch'
import { handleTicketsFetch } from '../fetchTicketsActions'

export const handleSeverityFilterUpdate = (newValue, oldValue, limit, otherFilterValue = null) => {
  return async dispatch => {
    if (newValue !== oldValue) {
      dispatch(handleTicketsFetch(1, limit, otherFilterValue, newValue))

      dispatch({ type: UPDATE_SEVERITY_FILTER_VALUE, payload: newValue })

      dispatch({ type: PAGE_CHANGE_LIST_TICKETS, payload: 1 })
    }
  }
}
