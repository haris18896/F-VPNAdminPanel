import { PAGE_CHANGE_LIST_SERVERS, RESET_SERVERS_LIST_FILTERS } from '../../../../actionType/server/filters'
import { handleServersFetch } from '../fetch'

export const handleResetServersListFilters = (
  page,
  limit,
  countryIdFilterValue,
  typeFilterValue,
  protocolFilterValue,
  statusFilterValue,
  cloudIdFilterValue
) => {
  return async dispatch => {
    if (countryIdFilterValue || typeFilterValue || protocolFilterValue || statusFilterValue || cloudIdFilterValue) {
      dispatch({ type: RESET_SERVERS_LIST_FILTERS })

      dispatch(handleServersFetch(1, limit, '', '', '', '', ''))

      dispatch({ type: PAGE_CHANGE_LIST_SERVERS, payload: 1 })
    }
  }
}
