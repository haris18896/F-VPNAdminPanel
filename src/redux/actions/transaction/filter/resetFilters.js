import { RESET_TRANSACTIONS_FILTERS } from '../../actionType/transaction/fetch'
import { handleTransactionsFetch } from '../fetch'

export const handleResetTransactionListFilters = (
  page,
  limit,
  transactionTimeFrom,
  transactionTimeTo,
  planFilterValue,
  modeFilterValue,
  statusFilterValue
) => {
  return async dispatch => {
    if ((transactionTimeFrom && transactionTimeTo) || planFilterValue || modeFilterValue || statusFilterValue) {
      dispatch({ type: RESET_TRANSACTIONS_FILTERS })

      dispatch(handleTransactionsFetch(page, limit))
    }
  }
}
