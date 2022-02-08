import {
  FETCH_CONTINENTS_INITIATED,
  FETCH_CONTINENTS_SUCCESS,
  FETCH_ALL_COUNTRIES_INITIATED,
  FETCH_ALL_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_INITIATED,
  FETCH_COUNTRIES_INITIATED_NO_UPDATES_VERSION,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_SUCCESS_NO_UPDATES_VERSION,
  PAGE_CHANGE_LIST_COUNTRIES,
  RESET_COUNTRIES_LIST_STATE,
  SELECT_CHANGE_COUNTRIES_LIST
} from "../../actions/actionType/country/fetch"

export const countryReducer = (
  state = {
    page: 1,
    limit: 10,
    totalRecords: 0
  },
  action
) => {
  switch (action.type) {
    case FETCH_CONTINENTS_INITIATED: {
      return { ...state, isContinentsLoading: true }
    }

    case FETCH_CONTINENTS_SUCCESS: {
      return {
        ...state,
        isContinentsLoading: false,
        continents: action.payload.continents
      }
    }

    case FETCH_COUNTRIES_INITIATED: {
      return { ...state, inProcess: true }
    }

    case FETCH_COUNTRIES_SUCCESS: {
      return {
        ...state,
        inProcess: false,
        countryListData: action.payload,
        totalPages: action.payload.totalPages,
        totalRecords: action.payload.countriesCount,
      }
    }

    case FETCH_COUNTRIES_INITIATED_NO_UPDATES_VERSION: {
      return { ...state }
    }

    case FETCH_COUNTRIES_SUCCESS_NO_UPDATES_VERSION: {
      return {
        ...state,
        countryListData: action.payload,
        totalPages: action.payload.totalPages,
        totalRecords: action.payload.countriesCount,
      }
    }

    case PAGE_CHANGE_LIST_COUNTRIES: {
      return { ...state, page: action.payload }
    }

    case SELECT_CHANGE_COUNTRIES_LIST: {
      return { ...state, limit: action.payload }
    }

    case FETCH_ALL_COUNTRIES_INITIATED: {
      return { ...state, countriesFetchInProcess: true }
    }
    case FETCH_ALL_COUNTRIES_SUCCESS: {
      return {
        ...state,
        countries: action.payload.countries,
        countriesFetchInProcess: false,
      }
    }
    case RESET_COUNTRIES_LIST_STATE: {
      return { page: 1, limit: 10 }
    }
    default: {
      return state
    }
  }
}
