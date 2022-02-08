import { PAGE_CHANGE_LIST_CITIES, RESET_CITIES_FILTERS } from '../../actionType/city/fetch'
import { handleCitiesFetch } from '../fetch'

export const handleResetCitiesListFilters = (page, limit, countryIdFilterValue, continentFilterValue, searchKeyword) => {
  return async dispatch => {
    if (countryIdFilterValue || continentFilterValue) {
      dispatch({ type: RESET_CITIES_FILTERS })
      dispatch(handleCitiesFetch(1, limit, '', '', searchKeyword))
      dispatch({ type: PAGE_CHANGE_LIST_CITIES, payload: 1 })
    }
  }
}
