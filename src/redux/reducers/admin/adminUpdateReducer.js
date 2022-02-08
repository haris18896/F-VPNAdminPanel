import {
  FETCH_ADMIN_INITIATED,
  FETCH_ADMIN_SUCCESS,
} from "../../actions/actionType/admin/fetch"

import {
  UPDATE_ADMIN_FAILED,
  UPDATE_ADMIN_INITIATED,
  UPDATE_ADMIN_SUCCESS,
} from "../../actions/actionType/admin/update"

export const adminUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ADMIN_INITIATED: {
      return { inProcess: true }
    }
    case FETCH_ADMIN_SUCCESS: {
      return {
        inProcess: false,
        profile: action.payload.profile,
        isAdminFetched: true,
      }
    }

    case UPDATE_ADMIN_INITIATED: {
      return {
        ...state,
        adminUpdationInProcess: true,
      }
    }

    case UPDATE_ADMIN_SUCCESS: {
      return {
        ...state,
        adminUpdationInProcess: false,
        isAdminUpdated: true,
        errs: [],
      }
    }

    case UPDATE_ADMIN_FAILED: {
      return {
        ...state,
        adminUpdationInProcess: false,
        isAdminUpdated: false,
        errs: action.payload.errors,
      }
    }

    default: {
      return state
    }
  }
}
