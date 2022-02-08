import {
  PAGE_CHANGE_LIST_TRANSACTIONS,
  UPDATE_STATUS_FILTER_VALUE_TRANSACTION,
} from "../../actionType/transaction/fetch"
import { handleTransactionsFetch } from "../fetch"

// import { UPDATE_MODE_FILTER_VALUE } from '../../actionType/transaction/fetch'

export const handleStatusFilterUpdateTransactions = (
  newValue,
  oldValue,
  limit,
  transactionTimeFrom = null,
  transactionTimeTo = null,
  planFilterValue = null,
  modeFilterValue = null
) => {
  return async (dispatch) => {
    if (newValue !== oldValue) {
      dispatch({
        type: UPDATE_STATUS_FILTER_VALUE_TRANSACTION,
        payload: newValue,
      })

      dispatch(
        handleTransactionsFetch(
          1,
          limit,
          transactionTimeFrom,
          transactionTimeTo,
          planFilterValue,
          modeFilterValue,
          newValue
        )
      )

      dispatch({ type: PAGE_CHANGE_LIST_TRANSACTIONS, payload: 1 })
    }
  }
}
