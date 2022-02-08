import { PAGE_CHANGE_LIST_LOGS, SELECT_CHANGE_LOGS_LIST } from '../../../actionType/logs/fetch'
import { handleFetchVpnConnectionLogs } from '../fetch'

export const handleSelectChangeListLogs = (
  newLimit,
  oldLimit,
  countryIdFilterValue,
  continentFilterValue,
  connectionTimeFrom,
  connectionTimeTo
) => {
  return async dispatch => {
    if (newLimit !== oldLimit) {
      dispatch(
        handleFetchVpnConnectionLogs(
          1,
          newLimit,
          countryIdFilterValue,
          continentFilterValue,
          connectionTimeFrom,
          connectionTimeTo
        )
      )

      dispatch({ type: SELECT_CHANGE_LOGS_LIST, payload: newLimit })

      dispatch({ type: PAGE_CHANGE_LIST_LOGS, payload: 1 })
    }
  }
}
