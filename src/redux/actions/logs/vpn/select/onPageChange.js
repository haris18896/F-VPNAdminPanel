import { PAGE_CHANGE_LIST_LOGS } from '../../../actionType/logs/fetch'
import { handleFetchVpnConnectionLogs } from '../fetch'

export const handlePageChangeListLogs = (
  page,
  limit,
  countryIdFilterValue,
  continentFilterValue,
  connectionTimeFrom,
  connectionTimeTo
) => {
  return async dispatch => {
    const newPage = page.selected + 1

    dispatch(
      handleFetchVpnConnectionLogs(
        newPage,
        newLimit,
        countryIdFilterValue,
        continentFilterValue,
        connectionTimeFrom,
        connectionTimeTo
      )
    )

    dispatch({ type: PAGE_CHANGE_LIST_LOGS, payload: newPage })
  }
}
