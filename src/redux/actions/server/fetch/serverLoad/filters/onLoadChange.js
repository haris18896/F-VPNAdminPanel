import {
  PAGE_CHANGE_LIST_SERVERS_LOAD_STATS,
  UPDATE_LOAD_FILTER_VALUE_LIST_SERVERS_LOAD_STATS,
} from "../../../../actionType/server/fetch/countryServersLoadStats"
import { handleFetchCountryServersLoadStats } from "../../servers/fetch/countryServersLoadStats"

export const handleloadFilterUpdate = (
  newValue,
  oldValue,
  limit,
  countryIdFilterValue,
  protocolFilterValue,
  cloudIdFilterValue
) => {
  return async (dispatch) => {
    if (newValue !== oldValue) {
      dispatch(
        handleFetchCountryServersLoadStats(
          1,
          limit,
          countryIdFilterValue,
          newValue,
          protocolFilterValue,
          cloudIdFilterValue
        )
      )

      dispatch({
        type: UPDATE_LOAD_FILTER_VALUE_LIST_SERVERS_LOAD_STATS,
        payload: newValue,
      })

      dispatch({ type: PAGE_CHANGE_LIST_SERVERS_LOAD_STATS, payload: 1 })
    }
  }
}
