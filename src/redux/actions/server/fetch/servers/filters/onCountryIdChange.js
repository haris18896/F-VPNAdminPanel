import { UPDATE_COUNTRY_ID_FILTER_VALUE_LIST_SERVERS } from '../../../../actionType/server/filters'
import { handleServersFetch } from '../fetch'

export const handleCountryIdFilterUpdate = (
  newValue,
  oldValue,
  limit,
  typeFilterValue,
  protocolFilterValue,
  statusFilterValue,
  cloudIdFilterValue
) => {
  return async dispatch => {
    if (newValue !== oldValue) {
      dispatch(
        handleServersFetch(1, limit, newValue, typeFilterValue, protocolFilterValue, statusFilterValue, cloudIdFilterValue)
      )

      dispatch({ type: UPDATE_COUNTRY_ID_FILTER_VALUE_LIST_SERVERS, payload: newValue })
    }
  }
}
