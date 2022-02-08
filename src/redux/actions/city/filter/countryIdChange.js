import {
  PAGE_CHANGE_LIST_CITIES,
  UPDATE_COUNTRY_ID_FILTER_VALUE_CITY_LIST,
} from "../../actionType/city/fetch"
import { handleCitiesFetch } from "../fetch"

export const handleCountryIdFilterUpdate = (
  newValue,
  oldValue,
  limit,
  continentFilterValue,
  searchKeyword
) => {
  return async (dispatch) => {
    if (newValue !== oldValue) {
      dispatch(handleCitiesFetch(1, limit, newValue, continentFilterValue, searchKeyword))

      dispatch({ type: UPDATE_COUNTRY_ID_FILTER_VALUE_CITY_LIST, payload: newValue })

      dispatch({ type: PAGE_CHANGE_LIST_CITIES, payload: 1 })
    }
  }
}
