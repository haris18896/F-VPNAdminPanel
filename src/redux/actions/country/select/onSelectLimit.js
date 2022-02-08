import { PAGE_CHANGE_LIST_COUNTRIES, SELECT_CHANGE_COUNTRIES_LIST } from '../../actionType/country/fetch'
import { handleCountriesFetch } from '../fetch'

export const handleSelectChangeListCountries = (
  newLimit,
  oldLimit,
  continentFilter,
  searchKeyword
) => {
  return async dispatch => {
    if (newLimit !== oldLimit) {
      dispatch({ type: SELECT_CHANGE_COUNTRIES_LIST, payload: newLimit })
      dispatch({ type: PAGE_CHANGE_LIST_COUNTRIES, payload: 1 })
      dispatch(handleCountriesFetch(1, newLimit, continentFilter, searchKeyword))
    }
  }
}
