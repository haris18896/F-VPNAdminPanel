import { PAGE_CHANGE_LIST_SERVERS_LOAD_STATS } from '../../../../actionType/server/fetch/countryServersLoadStats'
import { handleFetchCountryServersLoadStats } from '../../servers/fetch/countryServersLoadStats'

export const handlePageChangeListServersLoadStats = (
  page,
  limit,
  countryIdFilterValue,
  loadFilterValue,
  protocolFilterValue,
  cloudIdFilterValue
) => {
  return async dispatch => {
    const newPage = page.selected + 1

    dispatch({ type: PAGE_CHANGE_LIST_SERVERS_LOAD_STATS, payload: newPage })

    dispatch(
      handleFetchCountryServersLoadStats(
        newPage,
        limit,
        countryIdFilterValue,
        loadFilterValue,
        protocolFilterValue,
        cloudIdFilterValue
      )
    )
  }
}
