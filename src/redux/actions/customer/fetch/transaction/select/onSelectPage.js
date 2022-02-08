import { handleFetchTransactionDetails } from '..'
import { PAGE_CHANGE_LIST_TRANSACTIONS_DETAILS } from '../../../../actionType/customer'

export const handlePageChangeListTransactionsDetails = (page, limit, id) => {
  return async dispatch => {
    const newPage = page.selected + 1
    dispatch({ type: PAGE_CHANGE_LIST_TRANSACTIONS_DETAILS, payload: newPage })

    dispatch(handleFetchTransactionDetails(id, newPage, limit))
  }
}
