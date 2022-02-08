import { PAGE_CHANGE_LIST_SERVERS, SELECT_CHANGE_SERVERS_LIST } from '../../../../actionType/server/filters'
import { handleServersFetch } from '../fetch'

export const handleSelectChangeListServers = (
  newLimit,
  oldLimit,
  countryIdFilterValue,
  typeFilterValue,
  protocolFilterValue,
  statusFilterValue,
  cloudIdFilterValue
) => {
  return async dispatch => {
    if (newLimit !== oldLimit) {
      dispatch(
        handleServersFetch(
          1,
          newLimit,
          countryIdFilterValue,
          typeFilterValue,
          protocolFilterValue,
          statusFilterValue,
          cloudIdFilterValue
        )
      )

      dispatch({ type: SELECT_CHANGE_SERVERS_LIST, payload: newLimit })

      dispatch({ type: PAGE_CHANGE_LIST_SERVERS, payload: 1 })
    }
  }
}
