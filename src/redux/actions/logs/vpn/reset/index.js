import { PAGE_CHANGE_LIST_LOGS, RESET_LOGS_LIST_FILTERS } from '../../../actionType/logs/fetch'
import { handleFetchVpnConnectionLogs } from '../fetch'

export const handleResetLogsListFilters = (
  page,
  limit,
  countryIdFilterValue,
  continentFilterValue,
  connectionTimeFrom,
  connectionTimeTo
) => {
  return async dispatch => {
    if ((connectionTimeFrom && connectionTimeTo) || countryIdFilterValue || continentFilterValue) {
      dispatch({ type: RESET_LOGS_LIST_FILTERS })

      dispatch(handleFetchVpnConnectionLogs(1, limit, '', '', '', ''))

      dispatch({ type: PAGE_CHANGE_LIST_LOGS, payload: 1 })
    }
  }
}
