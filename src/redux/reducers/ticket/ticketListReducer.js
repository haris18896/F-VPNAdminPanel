import {
  FETCH_TICKETS_INITIATED,
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKETS_SUCCESS_NO_UPDATES_VERSION,
  RESET_TICKETS_LIST_STATE,
} from "../../actions/actionType/ticket/fetch"

export const ticketListReducer = (
  state = {
    page: 1,
    limit: 10,
    severityFilterValue: "",
    statusFilterValue: "",
  },
  action
) => {
  switch (action.type) {
    case FETCH_TICKETS_INITIATED: {
      return { ...state, inProcess: true }
    }
    case FETCH_TICKETS_SUCCESS: {
      return {
        ...state,
        inProcess: false,
        ticketsListData: action.payload,
        totalPages: action.payload.totalPages,
      }
    }

    case FETCH_TICKETS_SUCCESS_NO_UPDATES_VERSION: {
      return {
        ...state,
        ticketsListData: action.payload,
        totalPages: action.payload.totalPages,
      }
    }

    case "SELECT_CHANGE_TICKETS_LIST": {
      return { ...state, limit: action.payload, page: 1 }
    }

    case "PAGE_CHANGE_LIST_TICKETS": {
      return { ...state, inProcess: true, page: action.payload }
    }

    case "UPDATE_SEVERITY_FILTER_VALUE": {
      return { ...state, severityFilterValue: action.payload }
    }

    case "UPDATE_STATUS_FILTER_VALUE": {
      return { ...state, statusFilterValue: action.payload }
    }

    case "RESET_TICKETS_FILTERS": {
      return { ...state, statusFilterValue: "", severityFilterValue: "" }
    }

    case RESET_TICKETS_LIST_STATE: {
      return {
        page: 1,
        limit: 10,
        statusFilterValue: "",
        severityFilterValue: "",
      }
    }
    default: {
      return state
    }
  }
}
