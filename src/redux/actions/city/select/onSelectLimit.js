import { PAGE_CHANGE_LIST_CITIES, SELECT_CHANGE_CITIES_LIST } from '../../actionType/city/fetch'
import { handleCitiesFetch } from '../fetch'

export const handleSelectChangeListCities = (newLimit, oldLimit, countryIdFilterValue, continentFilterValue, searchKeyword) => {
  return async dispatch => {
    if (newLimit !== oldLimit) {
      dispatch(handleCitiesFetch(1, newLimit, countryIdFilterValue, continentFilterValue, searchKeyword))

      dispatch({ type: SELECT_CHANGE_CITIES_LIST, payload: newLimit })

      dispatch({ type: PAGE_CHANGE_LIST_CITIES, payload: 1 })
    }
  }
}
