import { RESET_TICKETS_FILTERS } from '../../../actionType/ticket/fetch'
import { handleTicketsFetch } from '../fetchTicketsActions'

export const handleResetFilters = (page, limit, statusFilterValue, severityFilterValue) => {
  return async dispatch => {
    if (statusFilterValue || severityFilterValue) {
      dispatch(handleTicketsFetch(page, limit))
      dispatch({ type: RESET_TICKETS_FILTERS })
    }
  }
}
