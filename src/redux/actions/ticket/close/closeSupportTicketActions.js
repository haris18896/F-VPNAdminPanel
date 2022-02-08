import useJwt from "@src/auth/jwt/useJwt"
import { handleTicketsFetch } from "../fetch/fetchTicketsActions"
import { CLOSE_SUPPORT_TICKET_INITIATED } from "../../actionType/ticket/close"

export const initiateCloseSupportTicket = () => {
  return async (dispatch) => {
    dispatch({ type: CLOSE_SUPPORT_TICKET_INITIATED })
  }
}

export const handleCloseSupportTicket = (
  id,
  page,
  limit,
  statusFilterValue = null,
  severityFilterValue = null,
  searchKeyword = null
) => {
  return async (dispatch) => {
    dispatch(initiateCloseSupportTicket())

    try {
      const response = await useJwt.closeSupportTicket(id)

      if (response && response.data) {
        dispatch(
          handleTicketsFetch(
            page,
            limit,
            statusFilterValue,
            severityFilterValue,
            searchKeyword
          )
        )
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
