import { handleFetchTransactionDetails } from '..'
import { PAGE_CHANGE_LIST_TRANSACTIONS_DETAILS, SELECT_CHANGE_TRANSACTIONS_LIST_DETAILS } from '../../../../actionType/customer'

export const handleSelectChangeListTransactionsDetails = (newLimit, oldLimit, id, page = null) => {
  return async dispatch => {
    if (newLimit !== oldLimit) {
      dispatch(handleFetchTransactionDetails(id, 1, newLimit))

      dispatch({ type: SELECT_CHANGE_TRANSACTIONS_LIST_DETAILS, payload: newLimit })

      dispatch({ type: PAGE_CHANGE_LIST_TRANSACTIONS_DETAILS, payload: 1 })
    }
  }
}
