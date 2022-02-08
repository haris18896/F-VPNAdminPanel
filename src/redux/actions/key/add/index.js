import useJwt from "@src/auth/jwt/useJwt"
import {
  ADD_SHH_KEY_FAILED,
  ADD_SHH_KEY_INITIATED,
  ADD_SHH_KEY_SUCCESS,
} from "../../actionType/key/add"

export const initiateAddSSHKey = () => {
  return async (dispatch) => {
    dispatch({ type: ADD_SHH_KEY_INITIATED })
  }
}

export const addSSHKeySuccess = (data) => {
  return async (dispatch) => {
    dispatch({ type: ADD_SHH_KEY_SUCCESS, payload: data })
  }
}

export const handleAddSSHKey = (data) => {
  return async (dispatch) => {
    dispatch(initiateAddSSHKey())
    // dispatch({ type: UPDATE_BLOCKEDAPPS_SETTINGS_INITIATED })

    try {
      const response = await useJwt.addSSHKey(data)
      if (response && response.data) {
        dispatch(addSSHKeySuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)

        dispatch({ type: ADD_SHH_KEY_FAILED, payload: err.response.data })
      }
    }
  }
}
