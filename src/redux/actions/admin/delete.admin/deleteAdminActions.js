import useJwt from "@src/auth/jwt/useJwt"
import {
  DELETE_ADMIN_INITIATED,
  DELETE_ADMIN_SUCCESS,
} from "../../actionType/admin/delete"
import { handleAdminsFetch } from "../fetch.admins/fetchAdminsActions"

export const deleteAdminInitiated = () => {
  return async (dispatch) => {
    dispatch({ type: DELETE_ADMIN_INITIATED })
  }
}

export const handleDeleteAdmin = (id, page, limit) => {
  return async (dispatch) => {
    try {
      const response = await useJwt.deleteAdmin(id)
      if (response && response.data) {
        dispatch({ type: DELETE_ADMIN_SUCCESS })
        dispatch(handleAdminsFetch(page, limit))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
