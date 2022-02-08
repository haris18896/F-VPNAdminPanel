import {
  FETCH_VPN_CONNECTION_LOGS_INITIATED,
  FETCH_VPN_CONNECTION_LOGS_SUCCESS,
  FETCH_VPN_CONNECTION_LOGS_SUCCESS_NO_UPDATES_VERSION,
  PAGE_CHANGE_LIST_LOGS,
  RESET_LOGS_LIST_FILTERS,
  RESET_LOGS_LIST_STATE,
  SELECT_CHANGE_LOGS_LIST,
  UPDATE_CONNECTION_TIME_RANGE,
  UPDATE_CONTINENT_FILTER_VALUE_LIST_VPN_LOGS,
  UPDATE_COUNTRY_ID_FILTER_VALUE_LIST_VPN_LOGS,
} from "../../actions/actionType/logs/fetch"

export const vpnLogsReducer = (
  state = {
    page: 1,
    limit: 10,
    connectionTimeFrom: "",
    connectionTimeTo: "",
    countryIdFilterValue: "",
    continentFilterValue: "",
  },
  action
) => {
  switch (action.type) {
    case FETCH_VPN_CONNECTION_LOGS_INITIATED: {
      return { ...state, inProcess: true }
    }
    case FETCH_VPN_CONNECTION_LOGS_SUCCESS: {
      return {
        ...state,
        inProcess: false,
        vpnConnectionLogData: action.payload,
        totalPages: action.payload.totalPages,
      }
    }
    case FETCH_VPN_CONNECTION_LOGS_SUCCESS_NO_UPDATES_VERSION: {
      return {
        ...state,
        vpnConnectionLogData: action.payload,
        totalPages: action.payload.totalPages,
      }
    }

    case UPDATE_CONNECTION_TIME_RANGE: {
      return {
        ...state,
        connectionTimeFrom: action.payload.from,
        connectionTimeTo: action.payload.to,
      }
    }

    case UPDATE_COUNTRY_ID_FILTER_VALUE_LIST_VPN_LOGS: {
      return { ...state, countryIdFilterValue: action.payload }
    }

    case UPDATE_CONTINENT_FILTER_VALUE_LIST_VPN_LOGS: {
      return { ...state, continentFilterValue: action.payload }
    }

    case SELECT_CHANGE_LOGS_LIST: {
      return { ...state, limit: action.payload }
    }

    case PAGE_CHANGE_LIST_LOGS: {
      return { ...state, page: action.payload }
    }

    case RESET_LOGS_LIST_FILTERS: {
      return {
        ...state,
        countryIdFilterValue: "",
        continentFilterValue: "",
        connectionTimeFrom: "",
        connectionTimeTo: "",
      }
    }

    case RESET_LOGS_LIST_STATE: {
      return {
        page: 1,
        limit: 10,
        countryIdFilterValue: "",
        continentFilterValue: "",
        connectionTimeFrom: "",
        connectionTimeTo: "",
      }
    }

    default: {
      return state
    }
  }
}
