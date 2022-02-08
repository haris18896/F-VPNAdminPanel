import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_SERVER_LOAD_TYPES_INITIATED,
  FETCH_SERVER_LOAD_TYPES_SUCCESS,
} from "../../../actionType/server/fetch/loadType"

export const initiateFetchServerLoadTypes = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_SERVER_LOAD_TYPES_INITIATED })
  }
}

export const handleFetchServerLoadTypes = () => {
  return async (dispatch) => {
    dispatch(initiateFetchServerLoadTypes())
    try {
      const response = await useJwt.getServerLoadTypes()
      if (response && response.data) {
        dispatch({
          type: FETCH_SERVER_LOAD_TYPES_SUCCESS,
          payload: response.data,
        })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
