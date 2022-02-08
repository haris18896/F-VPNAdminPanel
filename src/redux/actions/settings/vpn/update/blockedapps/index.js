/* eslint-disable */
import useJwt from '@src/auth/jwt/useJwt'
import {
  UPDATE_BLOCKEDAPPS_SETTINGS_INITIATED,
  UPDATE_BLOCKEDAPPS_SETTINGS_SUCCESS,
} from '../../../../actionType/settings/update/blockedapps'

export const initiateBlockedAppsSettingsUpdate = () => {
  return async dispatch => {
    dispatch({ type: UPDATE_BLOCKEDAPPS_SETTINGS_INITIATED })
  }
}

export const updateBlockedAppsSettingsSuccess = data => {
  return async dispatch => {
    dispatch({ type: UPDATE_BLOCKEDAPPS_SETTINGS_SUCCESS, payload: data })
  }
}

export const handleUpdateBlockedAppsSettings = data => {
  return async dispatch => {
    dispatch(initiateBlockedAppsSettingsUpdate())

    try {
      const response = await useJwt.updateBlockedAppsSettings(data)
      if (response && response.data) {
        dispatch(updateBlockedAppsSettingsSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
