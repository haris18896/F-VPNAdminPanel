import {
  PAGE_CHANGE_LIST_SERVERS,
  UPDATE_STATUS_FILTER_VALUE_LIST_SERVERS,
} from "../../../../actionType/server/filters"
import { handleServersFetch } from "../fetch"

export const handleStatusFilterUpdate = (
  newValue,
  oldValue,
  limit,
  countryIdFilterValue,
  typeFilterValue,
  protocolFilterValue,
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
          protocolFilterValue,
          newValue,
          cloudIdFilterValue
        )
      )

      dispatch({
        type: UPDATE_STATUS_FILTER_VALUE_LIST_SERVERS,
        payload: newValue,
      })

      dispatch({ type: PAGE_CHANGE_LIST_SERVERS, payload: 1 })
    }
  }
}
