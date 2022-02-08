import useJwt from '@src/auth/jwt/useJwt'
import { FETCH_PROFILE_FAILED, FETCH_PROFILE_INITIATED, FETCH_PROFILE_SUCCESS } from '../../actionType/profile/fetch'

export const fetchProfileInitiated = () => {
  return async dispatch => {
    dispatch({ type: FETCH_PROFILE_INITIATED })
  }
}

export const fetchProfileSuccess = data => {
  return async dispatch => {
    dispatch({ type: FETCH_PROFILE_SUCCESS, payload: data })
  }
}

export const fetchProfileFailed = data => {
  return async dispatch => {
    dispatch({ type: FETCH_PROFILE_FAILED, payload: data })
  }
}

export const handleFetchProfile = () => {
  return async dispatch => {
    try {
      dispatch(fetchProfileInitiated())
      const response = await useJwt.getProfile()
      if (response.data) {
        dispatch(fetchProfileSuccess(response.data.profile))
      }
    } catch (err) {
      if (err.response) {
        dispatch(fetchProfileFailed(err.response.data))
      }
    }
  }
}
