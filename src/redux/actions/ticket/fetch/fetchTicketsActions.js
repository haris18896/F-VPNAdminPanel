import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_TICKETS_INITIATED,
  FETCH_TICKETS_SUCCESS,
} from "../../actionType/ticket/fetch"

export const fetchTicketsSuccess = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TICKETS_SUCCESS, payload: data })
  }
}

export const handleTicketsFetch = (
  page,
  limit,
  statusFilterValue = null,
  severityFilterValue = null,
  searchKeyword = null
) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TICKETS_INITIATED })

    try {
      const response = await useJwt.getSupportTicketsDefault(
        page,
        limit,
        statusFilterValue,
        severityFilterValue,
        searchKeyword
      )
      if (response && response.data) {
        dispatch(fetchTicketsSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
