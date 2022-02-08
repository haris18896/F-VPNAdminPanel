import { UPDATE_COUNTRY_ID_FILTER_VALUE_LIST_VPN_LOGS } from '../../../actionType/logs/fetch'
import { handleFetchVpnConnectionLogs } from '../fetch'

export const handleCountryIdFilterUpdate = (
  newValue,
  oldValue,
  limit,
  continentFilterValue,
  connectionTimeFrom,
  connectionTimeTo
) => {
  return async dispatch => {
    if (newValue !== oldValue) {
      dispatch(handleFetchVpnConnectionLogs(1, limit, newValue, continentFilterValue, connectionTimeFrom, connectionTimeTo))

      dispatch({ type: UPDATE_COUNTRY_ID_FILTER_VALUE_LIST_VPN_LOGS, payload: newValue })
    }
  }
}
