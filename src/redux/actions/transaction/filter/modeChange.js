import { PAGE_CHANGE_LIST_TRANSACTIONS, UPDATE_MODE_FILTER_VALUE } from '../../actionType/transaction/fetch'
import { handleTransactionsFetch } from '../fetch'

export const handleModeFilterUpdate = (
  newValue,
  oldValue,
  limit,
  transactionTimeFrom = null,
  transactionTimeTo = null,
  planFilterValue = null,
  statusFilterValue = null
) => {
  return async dispatch => {
    if (newValue !== oldValue) {
      dispatch({ type: UPDATE_MODE_FILTER_VALUE, payload: newValue })

      dispatch(
        handleTransactionsFetch(1, limit, transactionTimeFrom, transactionTimeTo, planFilterValue, newValue, statusFilterValue)
      )

      dispatch({ type: PAGE_CHANGE_LIST_TRANSACTIONS, payload: 1 })
    }
  }
}
