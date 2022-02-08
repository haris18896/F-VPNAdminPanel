import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_MAIN_PROTOCOLS_FAILED,
  FETCH_MAIN_PROTOCOLS_INITIATED,
  FETCH_MAIN_PROTOCOLS_SUCCESS,
  FETCH_PROTOCOLS_FAILED,
  FETCH_PROTOCOLS_INITIATED,
  FETCH_PROTOCOLS_SUCCESS,
} from "../../../actionType/server/fetch/protocols"

export const initiateFetchMainProtocols = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_MAIN_PROTOCOLS_INITIATED })
  }
}

export const handleGetMainVpnProtocols = () => {
  return async (dispatch) => {
    dispatch(initiateFetchMainProtocols())
    try {
      const response = await useJwt.getMainVpnProtocols()
      if (response && response.data) {
        dispatch({
          type: FETCH_MAIN_PROTOCOLS_SUCCESS,
          payload: response.data,
        })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
        dispatch({
          type: FETCH_MAIN_PROTOCOLS_FAILED,
          payload: err.response.data,
        })
      }
    }
  }
}

export const initiateFetchProtocols = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_PROTOCOLS_INITIATED })
  }
}

export const handleFetchProtocols = () => {
  return async (dispatch) => {
    dispatch(initiateFetchProtocols())
    try {
      const response = await useJwt.getVpnProtocols()
      if (response && response.data) {
        dispatch({ type: FETCH_PROTOCOLS_SUCCESS, payload: response.data })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
        dispatch({ type: FETCH_PROTOCOLS_FAILED, payload: err.response.data })
      }
    }
  }
}
