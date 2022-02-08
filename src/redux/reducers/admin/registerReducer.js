import {
  CLEAR_REGISTER_ERRORS,
  INITIATE_REGISTRATION,
  REGISTRATION_FAILED,
  REGISTRATION_SUCCESS,
  RESET_REGISTER_STATE,
} from "../../actions/actionType/admin/register"

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case INITIATE_REGISTRATION: {
      return { ...state, inProcess: true }
    }

    case REGISTRATION_FAILED: {
      return { ...state, inProcess: false, errs: action.payload }
    }

    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        inProcess: false,
        errs: [],
        status: "SUCCESS",
      }
    }

    case CLEAR_REGISTER_ERRORS: {
      return {
        ...state,
        errs: [],
      }
    }

    case RESET_REGISTER_STATE: {
      return {}
    }

    default: {
      return state
    }
  }
}
