/* eslint-disable */
import useJwt from '@src/auth/jwt/useJwt'
import { UPDATE_PLAN_FAILED, UPDATE_PLAN_INITIATED, UPDATE_PLAN_SUCCESS } from '../../actionType/plan/update'

export const initiatedUpdatePlan = () => ({ type: UPDATE_PLAN_INITIATED })

export const updatePlanSuccess = data => ({ type: UPDATE_PLAN_SUCCESS, payload: data })

export const updatePlanFailed = data => ({ type: UPDATE_PLAN_FAILED, payload: data })

export const handleUpdatePlan = (data, id) => {
  return async dispatch => {
    try {
      dispatch(initiatedUpdatePlan())
      const response = await useJwt.updatePlan(data, id)
      if (response && response.data) {
        dispatch(updatePlanSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch(updatePlanFailed(err.response.data))
      }
    }
  }
}
