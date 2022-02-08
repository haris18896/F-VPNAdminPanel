import {
  ADD_CITY_FAILED,
  ADD_CITY_INITIATED,
  ADD_CITY_SUCCESS,
} from "../../actions/actionType/city/add"
import {
  FETCH_CITIES_INITIATED,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_SUCCESS_NO_UPDATES_VERSION,
  FETCH_CITY_INITIATED,
  FETCH_CITY_SUCCESS,
  PAGE_CHANGE_LIST_CITIES,
  RESET_CITIES_FILTERS,
  SELECT_CHANGE_CITIES_LIST,
  UPDATE_CONTINENT_FILTER_VALUE_CITY_LIST,
  UPDATE_COUNTRY_ID_FILTER_VALUE_CITY_LIST,
} from "../../actions/actionType/city/fetch"
import { RESET_CITY_STATE } from "../../actions/actionType/city/reset"
import {
  UPDATE_CITY_FAILED,
  UPDATE_CITY_INITIATED,
  UPDATE_CITY_SUCCESS,
} from "../../actions/actionType/city/update"
import {
  FETCH_CONTINENTS_INITIATED,
  FETCH_CONTINENTS_SUCCESS,
} from "../../actions/actionType/continent/fetch"

export const cityReducer = (
  state = {
    page: 1,
    limit: 10,
    countryIdFilterValue: "",
    continentFilterValue: "",
    totalRecords: 0
  },
  action
) => {
  switch (action.type) {
    case FETCH_CONTINENTS_INITIATED: {
      return { ...state, fetchContinentsInProcess: true }
    }

    case FETCH_CONTINENTS_SUCCESS: {
      return {
        ...state,
        continents: action.payload.continents,
        fetchContinentsInProcess: false,
      }
    }
    case UPDATE_COUNTRY_ID_FILTER_VALUE_CITY_LIST: {
      return { ...state, countryIdFilterValue: action.payload }
    }

    case UPDATE_CONTINENT_FILTER_VALUE_CITY_LIST: {
      return { ...state, continentFilterValue: action.payload }
    }

    case FETCH_CITIES_INITIATED: {
      return { ...state, inProcess: true }
    }

    case FETCH_CITIES_SUCCESS: {
      return {
        ...state,
        inProcess: false,
        citiesListData: action.payload,
        totalPages: action.payload.totalPages,
        totalRecords: action.payload.citiesCount
      }
    }

    case FETCH_CITY_INITIATED: {
      return { ...state, fetchCityInProcess: true }
    }

    case FETCH_CITY_SUCCESS: {
      return { ...state, fetchCityInProcess: false, city: action.payload.city }
    }

    case UPDATE_CITY_INITIATED: {
      return { ...state, updateCityInProcess: true }
    }

    case UPDATE_CITY_SUCCESS: {
      return {
        ...state,
        updateCityInProcess: false,
        city: action.payload.city,
        success: true,
      }
    }

    case UPDATE_CITY_FAILED: {
      return {
        ...state,
        updateCityInProcess: false,
        error: action.payload,
      }
    }

    case FETCH_CITIES_SUCCESS_NO_UPDATES_VERSION: {
      return {
        ...state,
        citiesListData: action.payload,
        totalPages: action.payload.totalPages,
        totalRecords: action.payload.citiesCount
      }
    }

    case SELECT_CHANGE_CITIES_LIST: {
      return { ...state, limit: action.payload }
    }

    case PAGE_CHANGE_LIST_CITIES: {
      return { ...state, page: action.payload }
    }

    case RESET_CITIES_FILTERS: {
      return {
        ...state,
        page: 1,
        limit: 10,
        countryIdFilterValue: "",
        continentFilterValue: "",
      }
    }
    case ADD_CITY_INITIATED: {
      return { ...state, addCityInProcess: true, error: null }
    }
    case ADD_CITY_SUCCESS: {
      return { ...state, addCityInProcess: false, success: true }
    }
    case ADD_CITY_FAILED: {
      return { ...state, addCityInProcess: false, error: action.payload }
    }

    case RESET_CITY_STATE: {
      return {
        page: 1,
        limit: 10,
        countryIdFilterValue: "",
        continentFilterValue: "",
        totalRecords: 0
      }
    }
    default: {
      return state
    }
  }
}
