import {
  PAGE_CHANGE_LIST_SERVERS,
  UPDATE_CLOUD_ID_FILTER_VALUE_LIST_SERVERS,
} from "../../../../actionType/server/filters"
import { handleServersFetch } from "../fetch"

export const handleOnCloudIdFilterUpdate = (
  newValue,
  oldValue,
  limit,
  countryIdFilterValue,
  typeFilterValue,
  protocolFilterValue,
  statusFilterValue
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
          statusFilterValue,
          newValue
        )
      )

      dispatch({
        type: UPDATE_CLOUD_ID_FILTER_VALUE_LIST_SERVERS,
        payload: newValue,
      })

      dispatch({ type: PAGE_CHANGE_LIST_SERVERS, payload: 1 })
    }
  }
}
