import useJwt from '@src/auth/jwt/useJwt'
import { UPDATE_AD_SETTINGS_INITIATED, UPDATE_AD_SETTINGS_SUCCESS } from '../../../../actionType/settings/update/ad'

export const initiateAdUpdate = () => {
  return async dispatch => {
    dispatch({ type: UPDATE_AD_SETTINGS_INITIATED })
  }
}

export const updateAdSettingsSuccess = data => {
  return async dispatch => {
    dispatch({ type: UPDATE_AD_SETTINGS_SUCCESS, payload: data })
  }
}

export const handleAdUpdate = data => {
  return async dispatch => {
    // dispatch({ type: FETCH_TICKETS_SUCCESS, payload: data })

    dispatch(initiateAdUpdate())

    try {
      const response = await useJwt.updateAdSettings(data)
      if (response && response.data) {
        dispatch(updateAdSettingsSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
