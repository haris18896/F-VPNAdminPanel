import {
  PAGE_CHANGE_LIST_CITIES,
  UPDATE_CONTINENT_FILTER_VALUE_CITY_LIST,
} from "../../actionType/city/fetch"
import { handleCitiesFetch } from "../fetch"

export const handleContinentIdFilterUpdate = (
  newValue,
  oldValue,
  limit,
  countryIdFilterValue,
  searchKeyword
) => {
  return async (dispatch) => {
    if (newValue !== oldValue) {
      dispatch(handleCitiesFetch(1, limit, countryIdFilterValue, newValue, searchKeyword))
      dispatch({ type: UPDATE_CONTINENT_FILTER_VALUE_CITY_LIST, payload: newValue  })
      dispatch({ type: PAGE_CHANGE_LIST_CITIES, payload: 1 })
    }
  }
}
