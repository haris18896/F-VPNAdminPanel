import useJwt from '@src/auth/jwt/useJwt'
import { FETCH_PLANS_INITIATED, FETCH_PLANS_SUCCESS } from '../../actionType/plans/fetch'

export const initiateFetchPlans = () => {
  return async dispatch => {
    dispatch({ type: FETCH_PLANS_INITIATED })
  }
}

export const fetchPlansSuccess = data => {
  return async dispatch => {
    dispatch({ type: FETCH_PLANS_SUCCESS, payload: data })
  }
}

export const handleFetchPlans = () => {
  return async dispatch => {
    dispatch(initiateFetchPlans())

    try {
      const response = await useJwt.getPlans()
      if (response && response.data) {
        // console.log(response.data)
        dispatch(fetchPlansSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
