import useJwt from '@src/auth/jwt/useJwt'
import { UPDATE_ADMIN_FAILED, UPDATE_ADMIN_INITIATED, UPDATE_ADMIN_SUCCESS } from '../../actionType/admin/update'

export const updateAdminInitiated = () => {
  return dispatch => dispatch({ type: UPDATE_ADMIN_INITIATED })
}

export const updateAdminSuccess = data => {
  return dispatch => dispatch({ type: UPDATE_ADMIN_SUCCESS, payload: data })
}

export const updateAdminFailed = data => {
  return dispatch => dispatch({ type: UPDATE_ADMIN_FAILED, payload: data })
}

export const handleUpdateAdmin = (id, data) => {
  return async dispatch => {
    try {
      const response = await useJwt.updateAdmin(id, data)
      if (response.data) {
        dispatch(updateAdminSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(updateAdminFailed(err.response.data))
      }
    }
  }
}
