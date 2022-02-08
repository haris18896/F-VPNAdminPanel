import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_TICKETS_INITIATED_NO_UPDATES_VERSION,
  FETCH_TICKETS_SUCCESS_NO_UPDATES_VERSION,
} from "../../../actionType/ticket/fetch"

export const fetchTicketsSuccessNoUpdatesVersion = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TICKETS_SUCCESS_NO_UPDATES_VERSION, payload: data })
  }
}

export const handleTicketsFetchNoUpdatesVersion = (
  page,
  limit,
  statusFilterValue = null,
  severityFilterValue = null,
  searchKeyword
) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TICKETS_INITIATED_NO_UPDATES_VERSION })

    try {
      const response = await useJwt.getSupportTicketsDefault(
        page,
        limit,
        statusFilterValue,
        severityFilterValue,
        searchKeyword
      )

      if (response && response.data) {
        dispatch(fetchTicketsSuccessNoUpdatesVersion(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
