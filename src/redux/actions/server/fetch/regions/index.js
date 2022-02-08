import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_REGIONS_BY_CITY_INITIATED,
  FETCH_REGIONS_BY_CITY_SUCCESS,
} from "../../../actionType/server/fetch/regions"

export const initiateFetchRegions = () => ({ type: FETCH_REGIONS_BY_CITY_INITIATED })

export const handleFetchRegionsByCity = (cloudId, cityId) => {
  return async (dispatch) => {
    dispatch(initiateFetchRegions())
    try {
      const response = await useJwt.getRegionsByCity(cloudId, cityId)
      if (response && response.data) {
        dispatch({
          type: FETCH_REGIONS_BY_CITY_SUCCESS,
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
