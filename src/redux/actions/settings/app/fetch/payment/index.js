/* eslint-disable */
import useJwt from '@src/auth/jwt/useJwt'
import { FETCH_PAYMENT_SETTINGS_INITIATED, FETCH_PAYMENT_SETTINGS_SUCCESS } from '../../../../actionType/settings/fetch/payment'

export const initiateFetchPaymentSettings = () => {
  return async dispatch => {
    dispatch({ type: FETCH_PAYMENT_SETTINGS_INITIATED })
  }
}

export const fetchPaymentSettingsSuccess = data => {
  return async dispatch => {
    dispatch({ type: FETCH_PAYMENT_SETTINGS_SUCCESS, payload: data })
  }
}

export const handleFetchPaymentSettings = () => {
  return async dispatch => {
    dispatch(initiateFetchPaymentSettings())

    try {
      const response = await useJwt.getPaymentSettings()
      if (response && response.data) {
        dispatch(fetchPaymentSettingsSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
