import { PAGE_CHANGE_LIST_COUNTRIES } from '../../actionType/country/fetch'
import { handleCountriesFetch } from '../fetch'

export const handlePageChangeListCoutries = (page, limit, continentFilter, searchKeyword) => {
  return async dispatch => {
    const newPage = page.selected + 1
    dispatch({ type: PAGE_CHANGE_LIST_COUNTRIES, payload: newPage })
    dispatch(handleCountriesFetch(newPage, limit, continentFilter, searchKeyword))
  }
}
