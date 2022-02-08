import {
  FETCH_PENDING_CUSTOMERS_FAILED,
  FETCH_PENDING_CUSTOMERS_INITIATED,
  FETCH_PENDING_CUSTOMERS_INITIATED_NO_UPDATES_VERSION,
  FETCH_PENDING_CUSTOMERS_SUCCESS,
  FETCH_PENDING_CUSTOMERS_SUCCESS_NO_UPDATES_VERSION,
  PAGE_CHANGE_LIST_PENDING_CUSTOMERS,
  RESET_PENDING_CUSTOMERS_LIST_STATE,
  SELECT_CHANGE_PENDING_CUSTOMERS_LIST,
} from "../../../actions/actionType/customer"

export const pendingCustomersReducer = (
  state = {
    page: 1,
    limit: 10,
  },
  action
) => {
  switch (action.type) {
    case FETCH_PENDING_CUSTOMERS_INITIATED: {
      return { ...state, inProcess: true }
    }

    case FETCH_PENDING_CUSTOMERS_SUCCESS: {
      return {
        ...state,
        inProcess: false,
        customersListData: action.payload,
        totalPages: action.payload.totalPages,
      }
    }

    case FETCH_PENDING_CUSTOMERS_FAILED: {
      return {
        ...state,
        inProcess: false,
        customersListData: {},
        error: action.payload,
      }
    }

    case FETCH_PENDING_CUSTOMERS_INITIATED_NO_UPDATES_VERSION: {
      return { ...state }
    }

    case FETCH_PENDING_CUSTOMERS_SUCCESS_NO_UPDATES_VERSION: {
      return {
        ...state,
        customersListData: action.payload,
        totalPages: action.payload.totalPages,
      }
    }

    case SELECT_CHANGE_PENDING_CUSTOMERS_LIST: {
      return {
        ...state,
        limit: action.payload,
      }
    }

    case PAGE_CHANGE_LIST_PENDING_CUSTOMERS: {
      return {
        ...state,
        page: action.payload,
      }
    }

    case RESET_PENDING_CUSTOMERS_LIST_STATE: {
      return {
        page: 1,
        limit: 10,
      }
    }

    default: {
      return state
    }
  }
}
