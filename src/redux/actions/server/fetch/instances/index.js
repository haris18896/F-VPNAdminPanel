import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_INSTANCES_BY_REGION_INITIATED,
  FETCH_INSTANCES_BY_REGION_SUCCESS,
} from "../../../actionType/server/fetch/instances"

export const initiateFetchInstances = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_INSTANCES_BY_REGION_INITIATED })
  }
}

export const handleFetchInstancesByRegion = (cloudId, regionId, instanceType) => {
  return async (dispatch) => {
    dispatch(initiateFetchInstances())
    try {
      const response = await useJwt.getInstancesByRegion(cloudId, regionId, instanceType)
      if (response && response.data) {
        dispatch({
          type: FETCH_INSTANCES_BY_REGION_SUCCESS,
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
