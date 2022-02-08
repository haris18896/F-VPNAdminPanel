import useJwt from '@src/auth/jwt/useJwt'
import { UPDATE_PROFILE_INITIATED, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILED, 
  RESET_STATE } from '../../actionType/profile/update'

export const updateProfileInitiated = () => {
  return dispatch => dispatch({ type: UPDATE_PROFILE_INITIATED })
}

export const updateProfileSuccess = data => {
  return dispatch => dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data })
}

export const updateProfileFailed = data => {
  return dispatch => dispatch({ type: UPDATE_PROFILE_FAILED, payload: data })
}

export const handleUpdateProfile = data => {
  return async dispatch => {
    try {
      dispatch(updateProfileInitiated())
      const response = await useJwt.updateProfile(data)
      if (response.data) {
        dispatch(updateProfileSuccess(response.data.profile))
      }
    } catch (err) {
      if (err.response) {
        dispatch(updateProfileFailed(err.response.data))
      }
    }
  }
}

export const resetState = () => ({ type: RESET_STATE })