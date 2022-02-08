import axios from "axios"
import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_ADMINS_FAILED,
  FETCH_ADMINS_INITIATED,
  FETCH_ADMINS_INITIATED_NO_UPDATES_VERSION,
  FETCH_ADMINS_SUCCESS,
  FETCH_ADMINS_SUCCESS_NO_UPDATES_VERSION,
} from "../../actionType/admin/fetch"

export const fetchAdminsSuccess = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ADMINS_SUCCESS, payload: data })
  }
}

export const fetchAdminsSuccessNoUpdatesVersion = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ADMINS_SUCCESS_NO_UPDATES_VERSION, payload: data })
  }
}

export const handleAdminsFetch = (page, limit, searchKeyword = null) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ADMINS_INITIATED })
    try {
      const response = await useJwt.getAdmins(page, limit, searchKeyword)

      if (response.data) {
        dispatch(fetchAdminsSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch({ type: FETCH_ADMINS_FAILED })
      }
    }
  }
}

export const handleSelectChange = (newLimit, oldLimit) => {
  return async (dispatch) => {
    if (newLimit !== oldLimit) {
      dispatch(handleAdminsFetch(1, newLimit))

      dispatch({ type: "SELECT_CHANGE", payload: newLimit })

      dispatch({ type: "PAGE_CHANGE", payload: 1 })
    }
  }
}

export const handlePageChange = (page, limit) => {
  return async (dispatch) => {
    const newPage = page.selected + 1

    dispatch(handleAdminsFetch(newPage, limit))

    dispatch({ type: "PAGE_CHANGE", payload: newPage })
  }
}

export const handleAdminsFetchNoUpdatesVersion = (
  page,
  limit,
  searchKeyword
) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ADMINS_INITIATED_NO_UPDATES_VERSION })
    try {
      const response = await useJwt.getAdmins(page, limit, searchKeyword)
      if (response.data) {
        dispatch(fetchAdminsSuccessNoUpdatesVersion(response.data))
      }
    } catch (err) {
      if (err.response) {
        // console.log(err.response)
        dispatch({ type: FETCH_ADMINS_FAILED })
      }
    }
  }
}
