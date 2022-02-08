import {
  PAGE_CHANGE_LIST_TRANSACTIONS,
  UPDATE_DATE_TIME_RANGE,
} from "../../actionType/transaction/fetch"
import { handleTransactionsFetch } from "../fetch"

export const handleUpdateDateTimeRange = (
  from,
  to,
  oldFrom,
  oldTo,
  limit,
  planFilterValue = null,
  modeFilterValue = null,
  statusFilterValue = null
) => {
  return async (dispatch) => {
    if (from !== oldFrom && to !== oldTo) {
      dispatch(
        handleTransactionsFetch(
          1,
          limit,
          from,
          to,
          planFilterValue,
          modeFilterValue,
          statusFilterValue
        )
      )

      dispatch({ type: UPDATE_DATE_TIME_RANGE, payload: { from, to } })

      dispatch({ type: PAGE_CHANGE_LIST_TRANSACTIONS, payload: 1 })
    }
  }
}
