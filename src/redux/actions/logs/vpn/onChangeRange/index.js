import { PAGE_CHANGE_LIST_LOGS, UPDATE_CONNECTION_TIME_RANGE } from '../../../actionType/logs/fetch'
import { handleFetchVpnConnectionLogs } from '../fetch'

export const handleUpdateConnectionTimeRange = (from, to, oldFrom, oldTo, limit, countryIdFilterValue, continentFilterValue) => {
  return async dispatch => {
    if (from !== oldFrom && to !== oldTo) {
      dispatch({ type: UPDATE_CONNECTION_TIME_RANGE, payload: { from, to } })

      dispatch(handleFetchVpnConnectionLogs(1, limit, countryIdFilterValue, continentFilterValue, from, to))

      dispatch({ type: PAGE_CHANGE_LIST_LOGS, payload: 1 })
    }
  }
}
