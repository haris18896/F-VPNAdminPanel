import {
  UPDATE_PASSWORD_FAILED,
  UPDATE_PASSWORD_INITIATED,
  UPDATE_PASSWORD_SUCCESS,
  RESET_STATE
} from "../../actions/actionType/password/update"

const initialState = {}

export const passwordUpdateReducer = (state = initialState, action) => {
  switch (action.type) {

    case UPDATE_PASSWORD_INITIATED: {
      return {
        ...state,
        passwordUpdationInProcess: true,
        success: false,
      }
    }
    case UPDATE_PASSWORD_SUCCESS: {
      return {
        ...state,
        passwordUpdationInProcess: false,
        success: true,
        error: null
      }
    }
    case UPDATE_PASSWORD_FAILED: {
      return {
        ...state,
        passwordUpdationInProcess: false,
        success: false,
        error: action.payload
      }
    }
    case RESET_STATE: {
      return {
        ...state,
        success: false,
        error: null
      }
    }
    default: {
      return state
    }
  }
}
