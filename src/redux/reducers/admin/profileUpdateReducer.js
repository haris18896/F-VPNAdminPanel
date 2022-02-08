import {
  FETCH_PROFILE_INITIATED,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILED,
} from "../../actions/actionType/profile/fetch"
import {
  UPDATE_PROFILE_FAILED,
  UPDATE_PROFILE_INITIATED,
  UPDATE_PROFILE_SUCCESS,
  RESET_STATE,
} from "../../actions/actionType/profile/update"

export const profileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PROFILE_INITIATED: {
      return { ...state, inProcess: true }
    }
    case FETCH_PROFILE_SUCCESS: {
      return {
        ...state,
        inProcess: false,
        profile: action.payload,
        error: null,
      }
    }
    case FETCH_PROFILE_FAILED: {
      return {
        ...state,
        inProcess: false,
        error: action.payload,
      }
    }
    case UPDATE_PROFILE_INITIATED: {
      return {
        ...state,
        profileUpdationInProcess: true,
      }
    }
    case UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        profileUpdationInProcess: false,
        profile: action.payload,
        success: true,
        error: null,
      }
    }
    case UPDATE_PROFILE_FAILED: {
      return {
        ...state,
        profileUpdationInProcess: false,
        success: false,
        error: action.payload,
      }
    }
    case RESET_STATE: {
      return {
        ...state,
        success: false,
        error: null,
      }
    }
    default: {
      return state
    }
  }
}
