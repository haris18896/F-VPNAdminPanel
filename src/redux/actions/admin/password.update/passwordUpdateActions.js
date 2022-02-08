import useJwt from "@src/auth/jwt/useJwt"
import {
  UPDATE_PASSWORD_FAILED,
  UPDATE_PASSWORD_INITIATED,
  UPDATE_PASSWORD_SUCCESS,
  RESET_STATE
} from "../../actionType/password/update"

export const updatePasswordInitiated = () => {
  return (dispatch) => dispatch({ type: UPDATE_PASSWORD_INITIATED })
}

export const updatePasswordSuccess = (data) => {
  return (dispatch) => dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data })
}

export const updatePasswordFailed = (data) => {
  return (dispatch) => dispatch({ type: UPDATE_PASSWORD_FAILED, payload: data })
}

export const handleUpdatePassword = (data) => {
  return async (dispatch) => {
    try {
      dispatch(updatePasswordInitiated())
      const response = await useJwt.updatePassword(data)
      if (response.data) {
        dispatch(updatePasswordSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(updatePasswordFailed(err.response.data))
      }
    }
  }
}

export const resetState = () => ({ type: RESET_STATE })