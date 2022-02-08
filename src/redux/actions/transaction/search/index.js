import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_TRANSACTIONS_INITIATED_NO_UPDATES_VERSION,
  FETCH_TRANSACTIONS_SUCCESS_NO_UPDATES_VERSION,
} from "../../actionType/transaction/fetch"

export const fetchTransactionsSuccessNoUpdatesVersion = (data) => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_TRANSACTIONS_SUCCESS_NO_UPDATES_VERSION,
      payload: data,
    })
  }
}

export const handleTransactionsFetchNoUpdatesVersion = (
  page,
  limit,
  transactionTimeFrom = null,
  transactionTimeTo = null,
  planFilterValue = null,
  modeFilterValue = null,
  statusFilterValue = null,
  searchKeyword
) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TRANSACTIONS_INITIATED_NO_UPDATES_VERSION })

    try {
      const response = await useJwt.getTransactions(
        page,
        limit,
        transactionTimeFrom,
        transactionTimeTo,
        planFilterValue,
        modeFilterValue,
        statusFilterValue,
        searchKeyword
      )
      if (response && response.data) {
        dispatch(fetchTransactionsSuccessNoUpdatesVersion(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
