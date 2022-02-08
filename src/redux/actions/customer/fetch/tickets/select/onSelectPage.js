import { PAGE_CHANGE_LIST_TICKETS_DETAILS } from '../../../../actionType/customer'

export const handlePageChangeListTicketsDetails = (page, limit, id) => {
  return async dispatch => {
    const newPage = page.selected + 1
    dispatch({ type: PAGE_CHANGE_LIST_TICKETS_DETAILS, payload: newPage })
    dispatch(handleFetchSupportTicketsDetails(id, newPage, limit))
  }
}
