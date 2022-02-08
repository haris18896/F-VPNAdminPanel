/* eslint-disable */
import useJwt from '@src/auth/jwt/useJwt'
import { ADD_CITY_FAILED, ADD_CITY_INITIATED, ADD_CITY_SUCCESS } from '../../actionType/city/add'
export const initiateAddCity = () => {
  return async dispatch => {
    dispatch({ type: ADD_CITY_INITIATED })
  }
}

export const addCitySuccess = data => {
  return async dispatch => {
    dispatch({ type: ADD_CITY_SUCCESS, payload: data })
  }
}

export const addCityFailed = data => {
  return async dispatch => {
    dispatch({ type: ADD_CITY_FAILED, payload: data })
  }
}

export const handleAddCity = data => {
  return async dispatch => {
    // dispatch({ type: FETCH_TICKETS_SUCCESS, payload: data })

    dispatch(initiateAddCity())

    try {
      const response = await useJwt.addCity(data)
      if (response && response.data) {
        dispatch(addCitySuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch(addCityFailed(err.response.data))
      }
    }
  }
}
