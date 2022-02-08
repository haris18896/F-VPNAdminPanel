import { PAGE_CHANGE_LIST_SERVERS, UPDATE_TYPE_FILTER_VALUE_LIST_SERVERS } from '../../../../actionType/server/filters'
import { handleServersFetch } from '../fetch'

export const handleTypeFilterUpdate = (
  newValue,
  oldValue,
  limit,
  countryIdFilterValue,
  protocolFilterValue,
  statusFilterValue,
  cloudIdFilterValue
) => {
  return async dispatch => {
    if (newValue !== oldValue) {
      dispatch(
        handleServersFetch(1, limit, countryIdFilterValue, newValue, protocolFilterValue, statusFilterValue, cloudIdFilterValue)
      )

      dispatch({ type: UPDATE_TYPE_FILTER_VALUE_LIST_SERVERS, payload: newValue })

      dispatch({ type: PAGE_CHANGE_LIST_SERVERS, payload: 1 })
    }
  }
}
