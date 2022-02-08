import {
  FETCH_CONNECTION_LOGS_DETAILS_INITIATED,
  FETCH_CONNECTION_LOGS_DETAILS_SUCCESS,
  FETCH_CUSTOMER_DETAILS_INITIATED,
  FETCH_CUSTOMER_DETAILS_SUCCESS,
  FETCH_SUBSCRIPTION_DETAILS_INITIATED,
  FETCH_SUBSCRIPTION_DETAILS_SUCCESS,
  FETCH_SUPPORT_TICKETS_DETAILS_INITIATED,
  FETCH_SUPPORT_TICKETS_DETAILS_SUCCESS,
  FETCH_TRANSACTION_DETAILS_INITIATED,
  FETCH_TRANSACTION_DETAILS_SUCCESS,
  PAGE_CHANGE_LIST_CONNECTION_LOG_DETAILS,
  PAGE_CHANGE_LIST_TICKETS_DETAILS,
  PAGE_CHANGE_LIST_TRANSACTIONS_DETAILS,
  RESET_CUSTOMER_DETAILS,
  SELECT_CHANGE_CONNECTION_LOG_LIST_DETAILS,
  SELECT_CHANGE_TICKETS_LIST_DETAILS,
  SELECT_CHANGE_TRANSACTIONS_LIST_DETAILS,
} from "../../../actions/actionType/customer"

export const customerDetailsReducer = (
  state = {
    supportTicketsPage: 1,
    supportTicketsLimit: 10,

    transactionsPage: 1,
    transactionsLimit: 10,

    logsPage: 1,
    logsLimit: 10,
  },
  action
) => {
  switch (action.type) {
    case FETCH_CUSTOMER_DETAILS_INITIATED: {
      return { ...state, fetchCustomerDetailsInProcess: true }
    }
    case FETCH_CUSTOMER_DETAILS_SUCCESS: {
      return {
        ...state,
        customer: action.payload.customers[0] ? action.payload.customers[0] : {},
        fetchCustomerDetailsInProcess: false,
      }
    }

    case FETCH_SUBSCRIPTION_DETAILS_INITIATED: {
      return { ...state, fetchSubscriptionDetailsInProcess: true }
    }
    case FETCH_SUBSCRIPTION_DETAILS_SUCCESS: {
      return {
        ...state,
        subscription: action.payload.customers[0] ? action.payload.customers[0].subscription : {},
        fetchSubscriptionDetailsInProcess: false,
      }
    }

    case FETCH_CONNECTION_LOGS_DETAILS_INITIATED: {
      return { ...state, fetchConnectionLogsInitiated: true }
    }

    case FETCH_CONNECTION_LOGS_DETAILS_SUCCESS: {
      return {
        ...state,
        logsListData: action.payload,
        fetchConnectionLogsInitiated: false,
      }
    }

    case FETCH_SUPPORT_TICKETS_DETAILS_INITIATED: {
      return { ...state, fetchTicketsDetailsInProcess: true }
    }

    case FETCH_SUPPORT_TICKETS_DETAILS_SUCCESS: {
      return {
        ...state,
        supportTicketsListData: action.payload,
        fetchTicketsDetailsInProcess: false,
      }
    }

    case SELECT_CHANGE_TICKETS_LIST_DETAILS: {
      return { ...state, supportTicketsLimit: action.payload }
    }
    case PAGE_CHANGE_LIST_TICKETS_DETAILS: {
      return { ...state, supportTicketsPage: action.payload }
    }

    case FETCH_TRANSACTION_DETAILS_INITIATED: {
      return { ...state, fetchTransactionsInProcess: true }
    }

    case FETCH_TRANSACTION_DETAILS_SUCCESS: {
      return {
        ...state,
        transactionsListData: action.payload,
        fetchTransactionsInProcess: false,
      }
    }

    case SELECT_CHANGE_TRANSACTIONS_LIST_DETAILS: {
      return { ...state, transactionsLimit: action.payload }
    }

    case PAGE_CHANGE_LIST_TRANSACTIONS_DETAILS: {
      return { ...state, transactionsPage: action.payload }
    }

    case SELECT_CHANGE_CONNECTION_LOG_LIST_DETAILS: {
      return { ...state, logsLimit: action.payload }
    }

    case PAGE_CHANGE_LIST_CONNECTION_LOG_DETAILS: {
      return { ...state, logsPage: action.payload }
    }

    case RESET_CUSTOMER_DETAILS: {
      return {
        supportTicketsPage: 1,
        supportTicketsLimit: 10,

        transactionsPage: 1,
        transactionsLimit: 10,

        logsPage: 1,
        logsLimit: 10,
      }
    }

    default: {
      return state
    }
  }
}
