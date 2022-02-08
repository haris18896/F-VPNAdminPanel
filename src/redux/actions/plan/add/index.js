/* eslint-disable */
import useJwt from '@src/auth/jwt/useJwt'
import { ADD_PLAN_FAILED, ADD_PLAN_INITIATED, ADD_PLAN_SUCCESS } from '../../actionType/plan/add'

export const initiatedAddPlan = () => ({ type: ADD_PLAN_INITIATED })

export const addPlanSuccess = data => ({ type: ADD_PLAN_SUCCESS, payload: data })

export const addPlanFailed = data => ({ type: ADD_PLAN_FAILED, payload: data })

export const handleAddPlan = data => {
  return async dispatch => {
    try {
      dispatch(initiatedAddPlan())
      const response = await useJwt.addPlan(data)
      if (response && response.data) {
        dispatch(addPlanSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch(addPlanFailed(err.response.data))
      }
    }
  }
}
