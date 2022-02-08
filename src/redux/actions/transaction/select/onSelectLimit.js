import { PAGE_CHANGE_LIST_TRANSACTIONS, SELECT_CHANGE_TRANSACTIONS_LIST } from '../../actionType/transaction/fetch'
import { handleTransactionsFetch } from '../fetch'
export const handleSelectChangeListTransactions = (
  newLimit,
  oldLimit,
  transactionTimeFrom = null,
  transactionTimeTo = null,
  planFilterValue = null,
  modeFilterValue = null,
  statusFilterValue = null
) => {
  return async dispatch => {
    if (newLimit !== oldLimit) {
      dispatch(
        handleTransactionsFetch(
          1,
          newLimit,
          transactionTimeFrom,
          transactionTimeTo,
          planFilterValue,
          modeFilterValue,
          statusFilterValue
        )
      )
      dispatch({ type: SELECT_CHANGE_TRANSACTIONS_LIST, payload: newLimit })

      dispatch({ type: PAGE_CHANGE_LIST_TRANSACTIONS, payload: 1 })
    }
  }
}
