import dotenv from "dotenv"
import useJwt from "@src/auth/jwt/useJwt"
import { FETCH_CLOUD_PROVIDERS_INITIATED, FETCH_CLOUD_PROVIDERS_SUCCESS } from "../../../actionType/server/fetch/cloudProviders"

dotenv.config()

export const initiateFetchCloudProviders = () => ({ type: FETCH_CLOUD_PROVIDERS_INITIATED })

export const handleFetchCloudProviders = () => {
  return async (dispatch) => {
    dispatch(initiateFetchCloudProviders())
    try {
      const response = await useJwt.getCloudProviders()
      if (response && response.data) {
        dispatch({
          type: FETCH_CLOUD_PROVIDERS_SUCCESS,
          payload: response.data,
        })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response)
      }
    }
  }
}
