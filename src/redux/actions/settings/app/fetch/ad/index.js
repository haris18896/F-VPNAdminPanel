import useJwt from '@src/auth/jwt/useJwt'
import { FETCH_SETTINGS_INITIATED, FETCH_SETTINGS_SUCCESS } from '../../../../actionType/settings/fetch/ad'

export const initiateFetchAdSettings = () => {
  return async dispatch => {
    dispatch({ type: FETCH_SETTINGS_INITIATED })
  }
}

export const fetchAdSettingsSuccess = data => {
  return async dispatch => {
    dispatch({ type: FETCH_SETTINGS_SUCCESS, payload: data })
  }
}

export const handleFetchAdSettings = () => {
  return async dispatch => {
    dispatch(initiateFetchAdSettings())

    try {
      const response = await useJwt.getAdSettings()
      if (response && response.data) {
        dispatch(fetchAdSettingsSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
