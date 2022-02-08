import {
  PAGE_CHANGE_LIST_SERVERS_LOAD_STATS,
  UPDATE_COUNTRY_ID_FILTER_VALUE_LIST_SERVERS_LOAD_STATS,
} from "../../../../actionType/server/fetch/countryServersLoadStats"
import { handleFetchCountryServersLoadStats } from "../../servers/fetch/countryServersLoadStats"

export const handleCountryIdFilterUpdate = (
  newValue,
  oldValue,
  limit,
  loadFilterValue,
  protocolFilterValue,
  cloudIdFilterValue
) => {
  return async (dispatch) => {
    if (newValue !== oldValue) {
      dispatch(
        handleFetchCountryServersLoadStats(
          1,
          limit,
          newValue,
          loadFilterValue,
          protocolFilterValue,
          cloudIdFilterValue
        )
      )

      dispatch({
        type: UPDATE_COUNTRY_ID_FILTER_VALUE_LIST_SERVERS_LOAD_STATS,
        payload: newValue,
      })

      dispatch({ type: PAGE_CHANGE_LIST_SERVERS_LOAD_STATS, payload: 1 })
    }
  }
}
