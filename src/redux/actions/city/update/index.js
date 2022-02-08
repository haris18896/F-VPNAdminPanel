/* eslint-disable */
import useJwt from '@src/auth/jwt/useJwt'
import { UPDATE_CITY_FAILED, UPDATE_CITY_INITIATED, UPDATE_CITY_SUCCESS } from '../../actionType/city/update'

export const initiateUpdateCity = () => ({ type: UPDATE_CITY_INITIATED })

export const updateCitySuccess = data => ({ type: UPDATE_CITY_SUCCESS, payload: data })

export const updateCityFailed = data => ({ type: UPDATE_CITY_FAILED, payload: data })

export const handleUpdateCity = (data, id) => {
  return async dispatch => {
    dispatch(initiateUpdateCity())
    try {
      const response = await useJwt.updateCity(data, id)
      if (response && response.data) {
        dispatch(updateCitySuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch(updateCityFailed(err.response.data))
        console.log(err.response.data)
      }
    }
  }
}
