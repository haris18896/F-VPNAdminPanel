import {
  UPDATE_CONTINENT_FILTER_VALUE_LIST_VPN_LOGS,
  UPDATE_COUNTRY_ID_FILTER_VALUE_LIST_VPN_LOGS,
} from "../../../actionType/logs/fetch"
import { handleFetchVpnConnectionLogs } from "../fetch"

export const handleContinentIdFilterUpdate = (
  newValue,
  oldValue,
  limit,
  countryIdFilterValue,
  connectionTimeFrom,
  connectionTimeTo
) => {
  return async (dispatch) => {
    if (newValue !== oldValue) {
      dispatch(
        handleFetchVpnConnectionLogs(
          1,
          limit,
          countryIdFilterValue,
          newValue,
          connectionTimeFrom,
          connectionTimeTo
        )
      )

      dispatch({
        type: UPDATE_CONTINENT_FILTER_VALUE_LIST_VPN_LOGS,
        payload: newValue,
      })
    }
  }
}
