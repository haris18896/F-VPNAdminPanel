import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_IMAGES_INITIATED,
  FETCH_IMAGES_SUCCESS,
} from "../../../actionType/server/fetch/images"

export const initiateFetchImages = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_IMAGES_INITIATED })
  }
}

export const handleFetchImages = (id, region) => {
  return async (dispatch) => {
    dispatch(initiateFetchImages())
    try {
      const response = await useJwt.getImages(id, region)
      if (response && response.data) {
        dispatch({ type: FETCH_IMAGES_SUCCESS, payload: response.data })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
