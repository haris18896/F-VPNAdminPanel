import {
  FETCH_COMPLETED_CUSTOMERS_INITIATED,
  FETCH_COMPLETED_CUSTOMERS_INITIATED_NO_UPDATES_VERSION,
  FETCH_COMPLETED_CUSTOMERS_SUCCESS,
  FETCH_COMPLETED_CUSTOMERS_SUCCESS_NO_UPDATES_VERSION,
  PAGE_CHANGE_LIST_COMPLETED_CUSTOMERS,
  RESET_COMPLETED_CUSTOMERS_LIST_FILTERS,
  RESET_COMPLETED_CUSTOMERS_LIST_STATE,
  SELECT_CHANGE_COMPLETED_CUSTOMERS_LIST,
  UPDATE_PLAN_FILTER_VALUE_COMPLETED_CUSTOMERS,
  UPDATE_SUBSCRIPTION_STATUS_COMPLETED_CUSTOMERS,
} from "../../../actions/actionType/customer"

export const completedCustomersReducer = (
  state = {
    page: 1,
    limit: 10,
    subscriptionStatus: "enabled",
    planIdFilterValue: "",
  },
  action
) => {
  switch (action.type) {
    case FETCH_COMPLETED_CUSTOMERS_INITIATED: {
      return { ...state, inProcess: true }
    }

    case FETCH_COMPLETED_CUSTOMERS_SUCCESS: {
      return {
        ...state,
        inProcess: false,
        customersListData: action.payload,
        totalPages: action.payload.totalPages,
      }
    }

    case FETCH_COMPLETED_CUSTOMERS_INITIATED_NO_UPDATES_VERSION: {
      return { ...state }
    }

    case FETCH_COMPLETED_CUSTOMERS_SUCCESS_NO_UPDATES_VERSION: {
      return {
        ...state,
        customersListData: action.payload,
        totalPages: action.payload.totalPages,
      }
    }

    case SELECT_CHANGE_COMPLETED_CUSTOMERS_LIST: {
      return {
        ...state,
        limit: action.payload,
      }
    }

    case PAGE_CHANGE_LIST_COMPLETED_CUSTOMERS: {
      return {
        ...state,
        page: action.payload,
      }
    }

    case UPDATE_SUBSCRIPTION_STATUS_COMPLETED_CUSTOMERS: {
      return {
        ...state,
        subscriptionStatus: action.payload,
      }
    }

    case UPDATE_PLAN_FILTER_VALUE_COMPLETED_CUSTOMERS: {
      return {
        ...state,
        planIdFilterValue: action.payload,
      }
    }

    case RESET_COMPLETED_CUSTOMERS_LIST_FILTERS: {
      return {
        ...state,
        subscriptionStatus: "enabled",
        planIdFilterValue: "",
      }
    }
    case RESET_COMPLETED_CUSTOMERS_LIST_STATE: {
      return {
        page: 1,
        limit: 10,
        subscriptionStatus: "enabled",
        planIdFilterValue: "",
      }
    }

    default: {
      return state
    }
  }
}
