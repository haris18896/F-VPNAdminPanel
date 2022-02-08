import {
  ADD_SHH_KEY_FAILED,
  ADD_SHH_KEY_INITIATED,
  ADD_SHH_KEY_SUCCESS,
  RESET_SHH_KEY_STATE,
} from "../../actions/actionType/key/add"

const sshKeyReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_SHH_KEY_INITIATED:
      return { inProcess: true }
    case ADD_SHH_KEY_SUCCESS:
      return { inProcess: false, data: action.payload, status: "SUCCESS" }
    case ADD_SHH_KEY_FAILED:
      return { inProcess: false, errs: action.payload.errors }
    case RESET_SHH_KEY_STATE:
      return {}
    default:
      return state
  }
}

export default sshKeyReducer
