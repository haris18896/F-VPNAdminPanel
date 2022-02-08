import { PAGE_CHANGE_LIST_TRANSACTIONS } from '../../actionType/transaction/fetch'
import { handleTransactionsFetch } from '../fetch'
export const handlePageChangeListTransactions = (
  page,
  limit,
  transactionTimeFrom = null,
  transactionTimeTo = null,
  planFilterValue = null,
  modeFilterValue = null,
  statusFilterValue = null
) => {
  return async dispatch => {
    const newPage = page.selected + 1
    dispatch({ type: PAGE_CHANGE_LIST_TRANSACTIONS, payload: newPage })

    dispatch(
      handleTransactionsFetch(
        newPage,
        limit,
        transactionTimeFrom,
        transactionTimeTo,
        planFilterValue,
        modeFilterValue,
        statusFilterValue
      )
    )
  }
}
