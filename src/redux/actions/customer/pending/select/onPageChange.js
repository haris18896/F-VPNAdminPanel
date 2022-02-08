import { PAGE_CHANGE_LIST_PENDING_CUSTOMERS } from '../../../actionType/customer'
import { handlePendingCustomersFetch } from '../../fetch/pending/index'

export const handlePageChange = (page, limit) => {
  return async dispatch => {
    const newPage = page.selected + 1
    dispatch({ type: PAGE_CHANGE_LIST_PENDING_CUSTOMERS, payload: newPage })

    dispatch(handlePendingCustomersFetch(newPage, limit))
  }
}
