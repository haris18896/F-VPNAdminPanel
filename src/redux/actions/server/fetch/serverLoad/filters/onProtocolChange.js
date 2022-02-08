import {
  PAGE_CHANGE_LIST_SERVERS_LOAD_STATS,
  UPDATE_LOAD_FILTER_VALUE_LIST_SERVERS_LOAD_STATS,
  UPDATE_PROTOCOL_FILTER_VALUE_LIST_SERVERS_LOAD_STATS,
} from "../../../../actionType/server/fetch/countryServersLoadStats"
import { handleFetchCountryServersLoadStats } from "../../servers/fetch/countryServersLoadStats"

export const handleProtocolFilterUpdate = (
  newValue,
  oldValue,
  limit,
  countryIdFilterValue,
  loadFilterValue,
  cloudIdFilterValue
) => {
  return async (dispatch) => {
    if (newValue !== oldValue) {
      dispatch(
        handleFetchCountryServersLoadStats(
          1,
          limit,
          countryIdFilterValue,
          loadFilterValue,
          newValue,
          cloudIdFilterValue
        )
      )

      dispatch({
        type: UPDATE_PROTOCOL_FILTER_VALUE_LIST_SERVERS_LOAD_STATS,
        payload: newValue,
      })

      dispatch({ type: PAGE_CHANGE_LIST_SERVERS_LOAD_STATS, payload: 1 })
    }
  }
}
