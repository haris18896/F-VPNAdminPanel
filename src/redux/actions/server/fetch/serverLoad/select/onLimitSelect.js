import {
  PAGE_CHANGE_LIST_SERVERS_LOAD_STATS,
  SELECT_CHANGE_SERVERS_LOAD_STATS_LIST,
} from "../../../../actionType/server/fetch/countryServersLoadStats"
import { handleFetchCountryServersLoadStats } from "../../servers/fetch/countryServersLoadStats"
export const handleSelectChangeListServersLoadStats = (
  newLimit,
  oldLimit,
  countryIdFilterValue,
  loadFilterValue,
  protocolFilterValue,
  cloudIdFilterValue
) => {
  return async (dispatch) => {
    if (newLimit !== oldLimit) {
      dispatch(
        handleFetchCountryServersLoadStats(
          1,
          newLimit,
          countryIdFilterValue,
          loadFilterValue,
          protocolFilterValue,
          cloudIdFilterValue
        )
      )

      dispatch({
        type: SELECT_CHANGE_SERVERS_LOAD_STATS_LIST,
        payload: newLimit,
      })

      dispatch({ type: PAGE_CHANGE_LIST_SERVERS_LOAD_STATS, payload: 1 })
    }
  }
}
