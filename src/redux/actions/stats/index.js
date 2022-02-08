import useJwt from '@src/auth/jwt/useJwt'
import { FETCH_STATS_INITIATED, FETCH_STATS_SUCCESS, FETCH_STATS_FAILED } from '../actionType/Stats/index'

export const handleFetchStats = () => {
  return async dispatch => {
    dispatch({ type: FETCH_STATS_INITIATED })

    try {
      const response = await useJwt.getStats()
      if (response && response.data) {
        dispatch({ type: FETCH_STATS_SUCCESS, payload: response.data })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch({ type: FETCH_STATS_FAILED, payload: err.response.data })
      }
    }
  }
}
