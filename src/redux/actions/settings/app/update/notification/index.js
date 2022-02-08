/* eslint-disable */
import useJwt from '@src/auth/jwt/useJwt'
import {
  UPDATE_NOTIFICATION_SETTINGS_INITIATED,
  UPDATE_NOTIFICATION_SETTINGS_SUCCESS,
} from '../../../../actionType/settings/update/notification'

export const initiateNotificationUpdate = () => {
  return async dispatch => {
    dispatch({ type: UPDATE_NOTIFICATION_SETTINGS_INITIATED })
  }
}

export const updateNotificationSettingsSuccess = data => {
  return async dispatch => {
    dispatch({ type: UPDATE_NOTIFICATION_SETTINGS_SUCCESS, payload: data })
  }
}

export const handleNotificationUpdate = data => {
  return async dispatch => {
    dispatch(initiateNotificationUpdate())

    try {
      const response = await useJwt.updateNotificationSettings(data)
      if (response && response.data) {
        dispatch(updateNotificationSettingsSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
