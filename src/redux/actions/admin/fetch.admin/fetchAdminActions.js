import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_ADMIN_INITIATED,
  FETCH_ADMIN_SUCCESS,
} from "../../actionType/admin/fetch"

export const fetchAdminInitiated = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ADMIN_INITIATED })
  }
}

export const fetchAdminSuccess = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ADMIN_SUCCESS, payload: data })
  }
}
export const handleFetchAdmin = (id) => {
  return async (dispatch) => {
    try {
      const response = await useJwt.getAdmin(id)
      if (response && response.data) {
        dispatch(fetchAdminSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  }
}
