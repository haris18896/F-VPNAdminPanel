import { handleFetchCountryServersLoadStats } from "../../servers/fetch/countryServersLoadStats"
import {
  PAGE_CHANGE_LIST_SERVERS_LOAD_STATS,
  RESET_SERVERS_LOAD_STATS_LIST_FILTERS,
} from "../../../../actionType/server/fetch/countryServersLoadStats"

export const handleResetServersLoadStatsListFilters = (
  page,
  limit,
  countryIdFilterValue,
  loadFilterValue,
  protocolFilterValue,
  cloudIdFilterValue
) => {
  return async (dispatch) => {
    if (
      countryIdFilterValue ||
      protocolFilterValue ||
      cloudIdFilterValue ||
      loadFilterValue !== "low"
    ) {
      dispatch({ type: RESET_SERVERS_LOAD_STATS_LIST_FILTERS })

      dispatch(handleFetchCountryServersLoadStats(1, limit, "", "low", "", ""))

      dispatch({ type: PAGE_CHANGE_LIST_SERVERS_LOAD_STATS, payload: 1 })
    }
  }
}
