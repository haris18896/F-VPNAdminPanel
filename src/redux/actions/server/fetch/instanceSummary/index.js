import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_INSTANCE_SUMMARY_INITIATED,
  FETCH_INSTANCE_SUMMARY_SUCCESS,
} from "../../../actionType/server/fetch/instanceSummary"

export const initiateFetchInstanceSummary = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_INSTANCE_SUMMARY_INITIATED })
  }
}

export const handleFetchInstanceSummaryDetails = (
  cloudId,
  regionId,
  instanceType,
  instanceId
) => {
  return async (dispatch) => {
    dispatch(initiateFetchInstanceSummary())
    try {
      const response = await useJwt.getInstanceSummary(
        cloudId,
        regionId,
        instanceType,
        instanceId
      )
      if (response && response.data) {
        dispatch({
          type: FETCH_INSTANCE_SUMMARY_SUCCESS,
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
