import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_CONTINENTS_WITH_CLOUD_ID_INITIATED,
  FETCH_CONTINENTS_WITH_CLOUD_ID_SUCCESS,
} from "../../../actionType/server/fetch/continents"

export const initiateFetchContinents = () => ({ type: FETCH_CONTINENTS_WITH_CLOUD_ID_INITIATED })

export const handleFetchContinentsWithCloudId = (id) => {
  return async (dispatch) => {
    dispatch(initiateFetchContinents())
    try {
      const response = await useJwt.getContinentsWithCloudId(id)
      if (response && response.data) {
        dispatch({
          type: FETCH_CONTINENTS_WITH_CLOUD_ID_SUCCESS,
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
