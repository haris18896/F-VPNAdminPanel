import {
  DISABLE_SUBSCRIPTION_INITIATED,
  DISABLE_SUBSCRIPTION_SUCCESS,
  ENABLE_SUBSCRIPTION_INITIATED,
  ENABLE_SUBSCRIPTION_SUCCESS,
  FETCH_SUBSCRIPTIONS_INITIATED,
  FETCH_SUBSCRIPTIONS_INITIATED_NO_UPDATES_VERSION,
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FETCH_SUBSCRIPTIONS_SUCCESS_NO_UPDATES_VERSION,
  PAGE_CHANGE_LIST_SUBSCRIPTIONS,
  RESET_SUBSCRIPTIONS_LIST_FILTERS,
  RESET_SUBSCRIPTIONS_LIST_STATE,
  SELECT_CHANGE_SUBSCRIPTIONS_LIST,
  UPDATE_AUTO_RENEWAL_FILTER_VALUE_LIST_SUBSCRIPTIONS,
  UPDATE_EXPIRY_TIME_RANGE_SUBSCRIPTION_LIST,
  UPDATE_ON_TRIAL_FILTER_VALUE_LIST_SUBSCRIPTIONS,
  UPDATE_PLAN_FILTER_VALUE_LIST_SUBSCRIPTIONS,
  UPDATE_START_TIME_RANGE_SUBSCRIPTION_LIST,
  UPDATE_STATUS_FILTER_VALUE_LIST_SUBSCRIPTIONS,
} from "../../actions/actionType/subscription/fetch"

export const subscriptionListFilter = (
  state = {
    page: 1,
    limit: 10,
    planIdFilterValue: "",
    autoRenewalFilterValue: "",
    onTrialFilterValue: "",
    statusFilterValue: "",
    startTimeFromFilterValue: "",
    startTimeToFilterValue: "",
    expiryTimeFromFilterValue: "",
    expiryTimeToFilterValue: "",
  },
  action
) => {
  switch (action.type) {
    case UPDATE_PLAN_FILTER_VALUE_LIST_SUBSCRIPTIONS: {
      return {
        ...state,
        planIdFilterValue: action.payload,
      }
    }

    case UPDATE_AUTO_RENEWAL_FILTER_VALUE_LIST_SUBSCRIPTIONS: {
      return {
        ...state,
        autoRenewalFilterValue: action.payload,
      }
    }

    case UPDATE_ON_TRIAL_FILTER_VALUE_LIST_SUBSCRIPTIONS: {
      return {
        ...state,
        onTrialFilterValue: action.payload,
      }
    }

    case UPDATE_STATUS_FILTER_VALUE_LIST_SUBSCRIPTIONS: {
      return {
        ...state,
        statusFilterValue: action.payload,
      }
    }

    case UPDATE_START_TIME_RANGE_SUBSCRIPTION_LIST: {
      return {
        ...state,
        startTimeFromFilterValue: action.payload.from,
        startTimeToFilterValue: action.payload.to,
      }
    }

    case UPDATE_EXPIRY_TIME_RANGE_SUBSCRIPTION_LIST: {
      return {
        ...state,
        expiryTimeFromFilterValue: action.payload.from,
        expiryTimeToFilterValue: action.payload.to,
      }
    }
    case FETCH_SUBSCRIPTIONS_INITIATED: {
      return { ...state, inProcess: true }
    }

    case FETCH_SUBSCRIPTIONS_SUCCESS: {
      return {
        ...state,
        inProcess: false,
        subscriptionsListData: action.payload,
        totalPages: action.payload.totalPages,
      }
    }

    case RESET_SUBSCRIPTIONS_LIST_FILTERS: {
      return {
        ...state,
        planIdFilterValue: "",
        autoRenewalFilterValue: "",
        onTrialFilterValue: "",
        statusFilterValue: "",
        startTimeFromFilterValue: "",
        startTimeToFilterValue: "",
        expiryTimeFromFilterValue: "",
        expiryTimeToFilterValue: "",
      }
    }

    case SELECT_CHANGE_SUBSCRIPTIONS_LIST: {
      return {
        ...state,
        limit: action.payload,
      }
    }

    case PAGE_CHANGE_LIST_SUBSCRIPTIONS: {
      return {
        ...state,
        page: action.payload,
      }
    }

    case DISABLE_SUBSCRIPTION_INITIATED: {
      return {
        ...state,
        disableSubInProcess: true,
      }
    }

    case DISABLE_SUBSCRIPTION_SUCCESS: {
      return {
        ...state,
        disableSubInProcess: false,
      }
    }

    case ENABLE_SUBSCRIPTION_INITIATED: {
      return {
        ...state,
        enableSubInProcess: true,
      }
    }

    case ENABLE_SUBSCRIPTION_SUCCESS: {
      return {
        ...state,
        enableSubInProcess: false,
      }
    }

    case FETCH_SUBSCRIPTIONS_INITIATED_NO_UPDATES_VERSION: {
      return {
        ...state,
      }
    }

    case FETCH_SUBSCRIPTIONS_SUCCESS_NO_UPDATES_VERSION: {
      return {
        ...state,
        subscriptionsListData: action.payload,
        totalPages: action.payload.totalPages,
      }
    }

    case RESET_SUBSCRIPTIONS_LIST_STATE: {
      return {
        page: 1,
        limit: 10,
        planIdFilterValue: "",
        autoRenewalFilterValue: "",
        onTrialFilterValue: "",
        statusFilterValue: "",
        startTimeFromFilterValue: "",
        startTimeToFilterValue: "",
        expiryTimeFromFilterValue: "",
        expiryTimeToFilterValue: "",
      }
    }

    default: {
      return state
    }
  }
}
