/* eslint-disable */
import useJwt from '@src/auth/jwt/useJwt'
import {
  FETCH_NOTIFICATION_SETTINGS_INITIATED,
  FETCH_NOTIFICATION_SETTINGS_SUCCESS,
} from '../../../../actionType/settings/fetch/notification'

export const initiateFetchNotificationSettings = () => {
  return async dispatch => {
    dispatch({ type: FETCH_NOTIFICATION_SETTINGS_INITIATED })
  }
}

export const fetchNotificationSettingsSuccess = data => {
  return async dispatch => {
    dispatch({ type: FETCH_NOTIFICATION_SETTINGS_SUCCESS, payload: data })
  }
}

export const handleFetchNotificationSettings = () => {
  return async dispatch => {
    dispatch(initiateFetchNotificationSettings())

    try {
      const response = await useJwt.getNotificationSettings()
      if (response && response.data) {
        dispatch(fetchNotificationSettingsSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
