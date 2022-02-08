import {
  FETCH_ADMINS_FAILED,
  FETCH_ADMINS_INITIATED,
  FETCH_ADMINS_SUCCESS,
  FETCH_ADMINS_SUCCESS_NO_UPDATES_VERSION,
  RESET_ADMINS_LIST_STATE,
} from "../../actions/actionType/admin/fetch"

import {
  DELETE_ADMIN_INITIATED,
  DELETE_ADMIN_SUCCESS,
} from "../../actions/actionType/admin/delete"

export const adminsListReducer = (state = { page: 1, limit: 10 }, action) => {
  switch (action.type) {
    case FETCH_ADMINS_INITIATED: {
      return { ...state, inProcess: true }
    }
    case FETCH_ADMINS_SUCCESS: {
      return {
        ...state,
        inProcess: false,
        adminsListData: action.payload,
        totalPages: action.payload.totalPages,
      }
    }

    case FETCH_ADMINS_FAILED: {
      return { ...state, inProcess: false, isAdminsFetchError: true }
    }

    case "SELECT_CHANGE": {
      return { ...state, limit: action.payload, page: 1 }
    }
    case "PAGE_CHANGE": {
      return { ...state, inProcess: true, page: action.payload }
    }

    case FETCH_ADMINS_SUCCESS_NO_UPDATES_VERSION: {
      return {
        ...state,
        adminsListData: action.payload,
        totalPages: action.payload.totalPages,
      }
    }

    case DELETE_ADMIN_INITIATED: {
      return { ...state, deleteInProcess: true, isDeleted: false }
    }
    case DELETE_ADMIN_SUCCESS: {
      return { ...state, deleteInProcess: false, isDeleted: true }
    }

    case RESET_ADMINS_LIST_STATE: {
      return { page: 1, limit: 10 }
    }
    default: {
      return state
    }
  }
}
