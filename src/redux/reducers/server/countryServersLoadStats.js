import {
  FETCH_COUNTRY_SERVERS_LOAD_STATS_FAILED,
  FETCH_COUNTRY_SERVERS_LOAD_STATS_FAILED_SEARCH,
  FETCH_COUNTRY_SERVERS_LOAD_STATS_INITIATED,
  FETCH_COUNTRY_SERVERS_LOAD_STATS_INITIATED_SEARCH,
  FETCH_COUNTRY_SERVERS_LOAD_STATS_SUCCESS,
  FETCH_COUNTRY_SERVERS_LOAD_STATS_SUCCESS_SEARCH,
  PAGE_CHANGE_LIST_SERVERS_LOAD_STATS,
  RESET_SERVERS_LOAD_STATS_LIST_FILTERS,
  RESET_SERVERS_LOAD_STATS_LIST_STATE,
  SELECT_CHANGE_SERVERS_LOAD_STATS_LIST,
  UPDATE_CLOUD_ID_FILTER_VALUE_LIST_SERVERS_LOAD_STATS,
  UPDATE_COUNTRY_ID_FILTER_VALUE_LIST_SERVERS_LOAD_STATS,
  UPDATE_LOAD_FILTER_VALUE_LIST_SERVERS_LOAD_STATS,
  UPDATE_PROTOCOL_FILTER_VALUE_LIST_SERVERS_LOAD_STATS,
} from "../../actions/actionType/server/fetch/countryServersLoadStats"
import {
  FETCH_SERVER_LOAD_TYPES_INITIATED,
  FETCH_SERVER_LOAD_TYPES_SUCCESS,
} from "../../actions/actionType/server/fetch/loadType"
import {
  FETCH_PROTOCOLS_FAILED,
  FETCH_PROTOCOLS_INITIATED,
  FETCH_PROTOCOLS_SUCCESS,
} from "../../actions/actionType/server/fetch/protocols"

// **  Initial State
const initialState = {
  page: 1,
  limit: 10,
  countryIdFilterValue: "",
  loadFilterValue: "low",
  protocolFilterValue: "",
  cloudIdFilterValue: "",
}

const countryServersLoadStatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SERVER_LOAD_TYPES_INITIATED: {
      return {
        ...state,
        fetchLoadTypesInProcess: true,
      }
    }

    case FETCH_SERVER_LOAD_TYPES_SUCCESS: {
      return {
        ...state,
        fetchLoadTypesInProcess: false,
        serverLoadTypes: action.payload.serverLoadTypes,
      }
    }

    case FETCH_COUNTRY_SERVERS_LOAD_STATS_INITIATED: {
      return {
        ...state,
        fetchCountryLoadServersInProcess: true,
      }
    }

    case FETCH_COUNTRY_SERVERS_LOAD_STATS_SUCCESS: {
      return {
        ...state,
        fetchCountryLoadServersInProcess: false,
        countryServersLoadStatsData: action.payload,
        totalPages: action.payload.totalPages,
      }
    }

    case FETCH_COUNTRY_SERVERS_LOAD_STATS_FAILED: {
      return {
        ...state,
        fetchCountryLoadServersInProcess: false,
        countryServersLoadStatsData: {},
        status: "FAILED",
        error: action.payload.data,
      }
    }

    case UPDATE_COUNTRY_ID_FILTER_VALUE_LIST_SERVERS_LOAD_STATS: {
      return {
        ...state,
        countryIdFilterValue: action.payload,
      }
    }

    case UPDATE_LOAD_FILTER_VALUE_LIST_SERVERS_LOAD_STATS: {
      return {
        ...state,
        loadFilterValue: action.payload,
      }
    }

    case UPDATE_PROTOCOL_FILTER_VALUE_LIST_SERVERS_LOAD_STATS: {
      return {
        ...state,
        protocolFilterValue: action.payload,
      }
    }

    case UPDATE_CLOUD_ID_FILTER_VALUE_LIST_SERVERS_LOAD_STATS: {
      return {
        ...state,
        cloudIdFilterValue: action.payload,
      }
    }

    case RESET_SERVERS_LOAD_STATS_LIST_FILTERS: {
      return {
        ...state,
        countryIdFilterValue: "",
        loadFilterValue: "low",
        protocolFilterValue: "",
        cloudIdFilterValue: "",
      }
    }

    case SELECT_CHANGE_SERVERS_LOAD_STATS_LIST: {
      return {
        ...state,
        limit: action.payload,
      }
    }

    case PAGE_CHANGE_LIST_SERVERS_LOAD_STATS: {
      return {
        ...state,
        page: action.payload,
      }
    }

    case FETCH_COUNTRY_SERVERS_LOAD_STATS_INITIATED_SEARCH: {
      return {
        ...state,
      }
    }

    case FETCH_COUNTRY_SERVERS_LOAD_STATS_SUCCESS_SEARCH: {
      return {
        ...state,
        countryServersLoadStatsData: action.payload,
        totalPages: action.payload.totalPages,
      }
    }

    case FETCH_COUNTRY_SERVERS_LOAD_STATS_FAILED_SEARCH: {
      return {
        ...state,
        countryServersLoadStatsData: {},
        status: "FAILED",
        error: action.payload.data,
      }
    }

    case FETCH_PROTOCOLS_INITIATED: {
      return {
        ...state,
        protocolsFetchInProcess: true,
      }
    }
    case FETCH_PROTOCOLS_SUCCESS: {
      return {
        ...state,
        protocolsFetchInProcess: false,
        protocols: action.payload.protocols,
      }
    }
    case FETCH_PROTOCOLS_FAILED: {
      return {
        ...state,
        protocolsFetchInProcess: false,
        protocolsFetchError: action.payload,
      }
    }

    case RESET_SERVERS_LOAD_STATS_LIST_STATE: {
      return {
        page: 1,
        limit: 10,
        loadFilterValue: "low",
        protocolFilterValue: "",
        cloudIdFilterValue: "",
      }
    }

    default:
      return state
  }
}

export default countryServersLoadStatsReducer
