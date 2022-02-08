import {
  PAGE_CHANGE_LIST_SERVERS_LOAD_STATS,
  UPDATE_CLOUD_ID_FILTER_VALUE_LIST_SERVERS_LOAD_STATS,
} from "../../../../actionType/server/fetch/countryServersLoadStats"
import { handleFetchCountryServersLoadStats } from "../../servers/fetch/countryServersLoadStats"

export const handleOnCloudIdFilterUpdate = (
  newValue,
  oldValue,
  limit,
  countryIdFilterValue,
  loadFilterValue,
  protocolFilterValue
) => {
  return async (dispatch) => {
    if (newValue !== oldValue) {
      dispatch(
        handleFetchCountryServersLoadStats(
          1,
          limit,
          countryIdFilterValue,
          loadFilterValue,
          protocolFilterValue,
          newValue
        )
      )

      dispatch({
        type: UPDATE_CLOUD_ID_FILTER_VALUE_LIST_SERVERS_LOAD_STATS,
        payload: newValue,
      })

      dispatch({ type: PAGE_CHANGE_LIST_SERVERS_LOAD_STATS, payload: 1 })
    }
  }
}
