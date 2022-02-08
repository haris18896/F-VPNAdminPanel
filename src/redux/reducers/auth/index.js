import {
  LOGIN_FAILED,
  LOGIN_INITIATED,
  LOGIN_SUCCESS,
} from "../../actions/actionType/admin/login"
import { LOGOUT_SUCCESSFUL } from "../../actions/actionType/admin/logout"

// **  Initial State
const initialState = {}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_INITIATED:
      return {
        loginInProgress: true,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginInProgress: false,
        admin: action.payload,
        error: {},
      }

    case LOGIN_FAILED:
      return {
        ...state,
        loginInProgress: false,
        error: action.payload,
        admin: {},
      }

    case LOGOUT_SUCCESSFUL:
      return {}
    default:
      return state
  }
}

export default authReducer
