import {
  FETCH_TICKETS_INITIATED,
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKETS_SUCCESS_NO_UPDATES_VERSION,
  RESET_TICKETS_LIST_STATE,
  UPDATE_STATUS_FILTER_VALUE,
} from "../../actions/actionType/ticket/fetch"
import {
  FETCH_TRANSACTIONS_INITIATED,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_SUCCESS_NO_UPDATES_VERSION,
  PAGE_CHANGE_LIST_TRANSACTIONS,
  RESET_TRANSACTIONS_FILTERS,
  RESET_TRANSACTIONS_LIST_STATE,
  SELECT_CHANGE_TRANSACTIONS_LIST,
  UPDATE_DATE_TIME_RANGE,
  UPDATE_MODE_FILTER_VALUE,
  UPDATE_PLAN_FILTER_VALUE,
  UPDATE_STATUS_FILTER_VALUE_TRANSACTION,
} from "../../actions/actionType/transaction/fetch"

export const transactionsListReducer = (
  state = {
    page: 1,
    limit: 10,
    planFilterValue: "",
    modeFilterValue: "",
    statusFilterValue: "",
    transactionTimeFrom: "",
    transactionTimeTo: "",
  },
  action
) => {
  switch (action.type) {
    case FETCH_TRANSACTIONS_INITIATED: {
      return { ...state, inProcess: true }
    }

    case FETCH_TRANSACTIONS_SUCCESS: {
      return {
        ...state,
        inProcess: false,
        transactionsListData: action.payload,
        totalPages: action.payload.totalPages,
      }
    }

    case FETCH_TRANSACTIONS_SUCCESS_NO_UPDATES_VERSION: {
      return {
        ...state,
        transactionsListData: action.payload,
        totalPages: action.payload.totalPages,
      }
    }

    case UPDATE_PLAN_FILTER_VALUE: {
      return { ...state, planFilterValue: action.payload }
    }

    case UPDATE_MODE_FILTER_VALUE: {
      return { ...state, modeFilterValue: action.payload }
    }

    case UPDATE_STATUS_FILTER_VALUE_TRANSACTION: {
      return { ...state, statusFilterValue: action.payload }
    }

    case UPDATE_DATE_TIME_RANGE: {
      return {
        ...state,
        transactionTimeFrom: action.payload.from,
        transactionTimeTo: action.payload.to,
      }
    }

    case SELECT_CHANGE_TRANSACTIONS_LIST: {
      return { ...state, limit: action.payload }
    }

    case PAGE_CHANGE_LIST_TRANSACTIONS: {
      return { ...state, page: action.payload }
    }

    case RESET_TRANSACTIONS_LIST_STATE: {
      return {
        page: 1,
        limit: 10,
        planFilterValue: "",
        modeFilterValue: "",
        statusFilterValue: "",
        transactionTimeFrom: "",
        transactionTimeTo: "",
      }
    }

    case RESET_TRANSACTIONS_FILTERS: {
      return {
        ...state,
        planFilterValue: "",
        modeFilterValue: "",
        statusFilterValue: "",
        transactionTimeFrom: "",
        transactionTimeTo: "",
      }
    }
    default: {
      return state
    }
  }
}
