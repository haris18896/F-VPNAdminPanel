import useJwt from '@src/auth/jwt/useJwt'
import { FETCH_PLAN_INITIATED, FETCH_PLAN_SUCCESS } from '../../actionType/plan/fetch'

export const initiateFetchPlan = () => ({ type: FETCH_PLAN_INITIATED })

export const fetchPlanSuccess = data => ({ type: FETCH_PLAN_SUCCESS, payload: data })

export const handleFetchPlan = id => {
  return async dispatch => {
    try {
      dispatch(initiateFetchPlan())
      const response = await useJwt.getPlan(id)
      if (response && response.data) {
        dispatch(fetchPlanSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
