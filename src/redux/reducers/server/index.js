import {
  ADD_SERVER_FAILED,
  ADD_SERVER_INITIATED,
  ADD_SERVER_SUCCESS,
} from "../../actions/actionType/server/add"
import {
  FETCH_CITIES_BY_COUNTRY_INITIATED,
  FETCH_CITIES_BY_COUNTRY_SUCCESS,
} from "../../actions/actionType/server/fetch/cities"
import {
  FETCH_CLOUD_PROVIDERS_INITIATED,
  FETCH_CLOUD_PROVIDERS_SUCCESS,
} from "../../actions/actionType/server/fetch/cloudProviders"
import {
  FETCH_CONTINENTS_WITH_CLOUD_ID_INITIATED,
  FETCH_CONTINENTS_WITH_CLOUD_ID_SUCCESS,
} from "../../actions/actionType/server/fetch/continents"
import {
  FETCH_COUNTRIES_BY_CONTINENT_INITIATED,
  FETCH_COUNTRIES_BY_CONTINENT_SUCCESS,
} from "../../actions/actionType/server/fetch/countries"
import {
  FETCH_DNS_PROVIDERS_INITIATED,
  FETCH_DNS_PROVIDERS_SUCCESS,
} from "../../actions/actionType/server/fetch/dnsProviders"
import {
  FETCH_IMAGES_INITIATED,
  FETCH_IMAGES_SUCCESS,
} from "../../actions/actionType/server/fetch/images"
import {
  FETCH_INSTANCES_BY_REGION_INITIATED,
  FETCH_INSTANCES_BY_REGION_SUCCESS,
} from "../../actions/actionType/server/fetch/instances"
import {
  FETCH_INSTANCE_SUMMARY_INITIATED,
  FETCH_INSTANCE_SUMMARY_SUCCESS,
} from "../../actions/actionType/server/fetch/instanceSummary"
import {
  FETCH_MAIN_PROTOCOLS_FAILED,
  FETCH_MAIN_PROTOCOLS_INITIATED,
  FETCH_MAIN_PROTOCOLS_SUCCESS,
} from "../../actions/actionType/server/fetch/protocols"
import {
  FETCH_REGIONS_BY_CITY_INITIATED,
  FETCH_REGIONS_BY_CITY_SUCCESS,
} from "../../actions/actionType/server/fetch/regions"
import {
  FETCH_SERVERS_INITIATED,
  FETCH_SERVERS_INITIATED_NO_UPDATES_VERSION,
  FETCH_SERVERS_SUCCESS,
  FETCH_SERVERS_SUCCESS_NO_UPDATES_VERSION,
  RESET_SERVERS_LIST_STATE,
} from "../../actions/actionType/server/fetch/servers"
import {
  CLEAR_PROTOCOL_FILTER,
  PAGE_CHANGE_LIST_SERVERS,
  RESET_SERVERS_LIST_FILTERS,
  SELECT_CHANGE_SERVERS_LIST,
  UPDATE_CLOUD_ID_FILTER_VALUE_LIST_SERVERS,
  UPDATE_COUNTRY_ID_FILTER_VALUE_LIST_SERVERS,
  UPDATE_PROTOCOL_FILTER_VALUE_LIST_SERVERS,
  UPDATE_STATUS_FILTER_VALUE_LIST_SERVERS,
  UPDATE_TYPE_FILTER_VALUE_LIST_SERVERS,
} from "../../actions/actionType/server/filters"
import {
  START_SERVER_INITIATED,
  START_SERVER_SUCCESS,
} from "../../actions/actionType/server/start"
import {
  STOP_SERVER_INITIATED,
  STOP_SERVER_SUCCESS,
} from "../../actions/actionType/server/stop"

// **  Initial State
const initialState = {
  page: 1,
  limit: 10,
  countryIdFilterValue: "",
  typeFilterValue: "",
  statusFilterValue: "",
  protocolFilterValue: "",
  statusFilterValue: "",
  cloudIdFilterValue: "",
}

const serverReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLOUD_PROVIDERS_INITIATED:
      return {
        ...state,
        cloudProvidersFetchInProcess: true,
      }

    case FETCH_CLOUD_PROVIDERS_SUCCESS:
      return {
        ...state,
        cloudProvidersFetchInProcess: false,
        providers: action.payload.providers,
      }

    case FETCH_CONTINENTS_WITH_CLOUD_ID_INITIATED:
      return {
        ...state,
        continentsFetchInProcess: true,
      }
    case FETCH_CONTINENTS_WITH_CLOUD_ID_SUCCESS:
      return {
        ...state,
        continentsFetchInProcess: false,
        continents: action.payload.continents,
      }

    case FETCH_COUNTRIES_BY_CONTINENT_INITIATED:
      return {
        ...state,
        countriesFetchInProcess: true,
      }
    case FETCH_COUNTRIES_BY_CONTINENT_SUCCESS:
      return {
        ...state,
        countriesFetchInProcess: false,
        countries: action.payload.countries,
      }

    case FETCH_CITIES_BY_COUNTRY_INITIATED:
      return {
        ...state,
        citiesFetchInProcess: true,
      }

    case FETCH_CITIES_BY_COUNTRY_SUCCESS:
      return {
        ...state,
        citiesFetchInProcess: false,
        cities: action.payload.cities,
      }

    case FETCH_REGIONS_BY_CITY_INITIATED:
      return {
        ...state,
        regionsFetchInProcess: true,
      }

    case FETCH_REGIONS_BY_CITY_SUCCESS:
      return {
        ...state,
        regionsFetchInProcess: false,
        regions: action.payload.regions,
      }

    case FETCH_INSTANCES_BY_REGION_INITIATED:
      return {
        ...state,
        instancesFetchInProcess: true,
      }

    case FETCH_INSTANCES_BY_REGION_SUCCESS:
      return {
        ...state,
        instancesFetchInProcess: false,
        instances: action.payload.instances,
      }

    case FETCH_INSTANCE_SUMMARY_INITIATED:
      return {
        ...state,
        instancesSummaryFetchInProcess: true,
      }

    case FETCH_INSTANCE_SUMMARY_SUCCESS:
      return {
        ...state,
        instancesSummaryFetchInProcess: false,
        instance: action.payload.instance,
      }
    case FETCH_IMAGES_INITIATED:
      return {
        ...state,
        imagesFetchInProcess: true,
      }

    case FETCH_IMAGES_SUCCESS:
      return {
        ...state,
        imagesFetchInProcess: false,
        images: action.payload.images,
      }

    case FETCH_DNS_PROVIDERS_INITIATED:
      return {
        ...state,
        dnsFetchInProcess: true,
      }

    case FETCH_DNS_PROVIDERS_SUCCESS:
      return {
        ...state,
        dnsFetchInProcess: false,
        dnsProviders: action.payload.dnsProviders,
      }

    case ADD_SERVER_INITIATED: {
      return {
        ...state,
        addServerInProcess: true,
      }
    }

    case ADD_SERVER_SUCCESS: {
      return {
        ...state,
        addServerInProcess: false,
        server: action.payload.server,
        success: true,
      }
    }

    case ADD_SERVER_FAILED: {
      return {
        ...state,
        addServerInProcess: false,
        error: action.payload,
        success: false,
      }
    }

    case FETCH_SERVERS_INITIATED: {
      return {
        ...state,
        fetchServersInProcess: true,
      }
    }

    case FETCH_SERVERS_SUCCESS: {
      return {
        ...state,
        fetchServersInProcess: false,
        serversListData: action.payload,
        totalPages: action.payload.totalPages,
      }
    }

    case FETCH_SERVERS_INITIATED_NO_UPDATES_VERSION: {
      return {
        ...state,
      }
    }

    case FETCH_SERVERS_SUCCESS_NO_UPDATES_VERSION: {
      return {
        ...state,
        serversListData: action.payload,
        totalPages: action.payload.totalPages,
      }
    }

    case UPDATE_COUNTRY_ID_FILTER_VALUE_LIST_SERVERS: {
      return {
        ...state,
        countryIdFilterValue: action.payload,
      }
    }

    case UPDATE_TYPE_FILTER_VALUE_LIST_SERVERS: {
      return {
        ...state,
        typeFilterValue: action.payload,
      }
    }

    case UPDATE_PROTOCOL_FILTER_VALUE_LIST_SERVERS: {
      return {
        ...state,
        protocolFilterValue: action.payload,
      }
    }

    case UPDATE_STATUS_FILTER_VALUE_LIST_SERVERS: {
      return {
        ...state,
        statusFilterValue: action.payload,
      }
    }

    case UPDATE_CLOUD_ID_FILTER_VALUE_LIST_SERVERS: {
      return {
        ...state,
        cloudIdFilterValue: action.payload,
      }
    }

    case RESET_SERVERS_LIST_FILTERS: {
      return {
        ...state,
        countryIdFilterValue: "",
        typeFilterValue: "",
        protocolFilterValue: "",
        statusFilterValue: "",
        cloudIdFilterValue: "",
      }
    }

    case SELECT_CHANGE_SERVERS_LIST: {
      return {
        ...state,
        limit: action.payload,
      }
    }

    case PAGE_CHANGE_LIST_SERVERS: {
      return {
        ...state,
        page: action.payload,
      }
    }

    case START_SERVER_INITIATED: {
      return {
        ...state,
        initServerInProcess: true,
      }
    }

    case START_SERVER_SUCCESS: {
      return {
        ...state,
        initServerInProcess: false,
        data: action.payload,
      }
    }

    case STOP_SERVER_INITIATED: {
      return {
        ...state,
        stopServerInProcess: true,
      }
    }

    case STOP_SERVER_SUCCESS: {
      return {
        ...state,
        stopServerInProcess: false,
        data: action.payload,
      }
    }

    case FETCH_MAIN_PROTOCOLS_INITIATED: {
      return {
        ...state,
        fetchMainVpnProtocolsInProcess: true,
      }
    }

    case FETCH_MAIN_PROTOCOLS_SUCCESS: {
      return {
        ...state,
        fetchMainVpnProtocolsInProcess: false,
        protocols: action.payload.protocols,
      }
    }

    case FETCH_MAIN_PROTOCOLS_FAILED: {
      return {
        ...state,
        fetchMainVpnProtocolsInProcess: true,
        protocolsFetchError: action.payload,
      }
    }

    case CLEAR_PROTOCOL_FILTER: {
      return {
        ...state,
        protocolFilterValue: "",
      }
    }

    case RESET_SERVERS_LIST_STATE: {
      return {
        page: 1,
        limit: 10,
        typeFilterValue: "",
        protocolFilterValue: "",
        statusFilterValue: "",
        cloudIdFilterValue: "",
      }
    }
    default:
      return state
  }
}

export default serverReducer
