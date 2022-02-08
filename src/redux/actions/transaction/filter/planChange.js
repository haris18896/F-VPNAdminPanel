import { PAGE_CHANGE_LIST_TRANSACTIONS, UPDATE_PLAN_FILTER_VALUE } from '../../actionType/transaction/fetch'
import { handleTransactionsFetch } from '../fetch'

export const handlePlanFilterUpdate = (
  newValue,
  oldValue,
  limit,
  transactionTimeFrom = null,
  transactionTimeTo = null,
  modeFilterValue = null,
  statusFilterValue = null
) => {
  return async dispatch => {
    if (newValue !== oldValue) {
      dispatch(
        handleTransactionsFetch(1, limit, transactionTimeFrom, transactionTimeTo, newValue, modeFilterValue, statusFilterValue)
      )

      dispatch({ type: UPDATE_PLAN_FILTER_VALUE, payload: newValue })

      dispatch({ type: PAGE_CHANGE_LIST_TRANSACTIONS, payload: 1 })
    }
  }
}
