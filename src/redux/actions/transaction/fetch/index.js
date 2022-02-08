import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_TRANSACTIONS_INITIATED,
  FETCH_TRANSACTIONS_SUCCESS,
} from "../../actionType/transaction/fetch"

export const fetchTransactionsSuccess = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TRANSACTIONS_SUCCESS, payload: data })
  }
}

export const handleTransactionsFetch = (
  page,
  limit,
  transactionTimeFrom = null,
  transactionTimeTo = null,
  planFilterValue = null,
  modeFilterValue = null,
  statusFilterValue = null,
  searchKeyword = null
) => {
  return async (dispatch) => {
    // alert('Hello')
    dispatch({ type: FETCH_TRANSACTIONS_INITIATED })

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
        dispatch(fetchTransactionsSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
