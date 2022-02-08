import {
  PAGE_CHANGE_LIST_SERVERS,
  UPDATE_PROTOCOL_FILTER_VALUE_LIST_SERVERS,
} from "../../../../actionType/server/filters"
import { handleServersFetch } from "../fetch"

export const handleProtocolFilterUpdate = (
  newValue,
  oldValue,
  limit,
  countryIdFilterValue,
  typeFilterValue,
  statusFilterValue,
  cloudIdFilterValue
) => {
  return async (dispatch) => {
    if (newValue !== oldValue) {
      dispatch(
        handleServersFetch(
          1,
          limit,
          countryIdFilterValue,
          typeFilterValue,
          newValue,
          statusFilterValue,
          cloudIdFilterValue
        )
      )

      dispatch({
        type: UPDATE_PROTOCOL_FILTER_VALUE_LIST_SERVERS,
        payload: newValue,
      })

      dispatch({ type: PAGE_CHANGE_LIST_SERVERS, payload: 1 })
    }
  }
}
