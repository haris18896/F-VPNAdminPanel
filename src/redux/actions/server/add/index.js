import useJwt from "@src/auth/jwt/useJwt"
import {
  ADD_SERVER_FAILED,
  ADD_SERVER_INITIATED,
  ADD_SERVER_SUCCESS,
} from "../../actionType/server/add"
import dotenv from "dotenv"

dotenv.config()

export const initiateAddServer = () => {
  return async (dispatch) => {
    dispatch({ type: ADD_SERVER_INITIATED })
  }
}

export const handleAddServer = (data) => {
  return async (dispatch) => {
    dispatch(initiateAddServer())

    try {
      const response = await useJwt.addServer(data)
      if (response && response.data) {
        dispatch({ type: ADD_SERVER_SUCCESS, payload: response.data })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response)
        dispatch({ type: ADD_SERVER_FAILED, payload: err.response.data })
      }
    }
  }
}
