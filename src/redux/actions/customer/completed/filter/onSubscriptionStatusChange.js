import {
  PAGE_CHANGE_LIST_COMPLETED_CUSTOMERS,
  UPDATE_SUBSCRIPTION_STATUS_COMPLETED_CUSTOMERS,
} from "../../../actionType/customer"
import { handleCompletedCustomersFetch } from "../../fetch/completed"

export const handleSubscriptionStatusChange = (
  newValue,
  oldValue,
  limit,
  planIdFilterValue
) => {
  return async (dispatch) => {
    if (newValue !== oldValue) {
      dispatch(
        handleCompletedCustomersFetch(1, limit, newValue, planIdFilterValue)
      )

      dispatch({
        type: UPDATE_SUBSCRIPTION_STATUS_COMPLETED_CUSTOMERS,
        payload: newValue,
      })

      dispatch({ type: PAGE_CHANGE_LIST_COMPLETED_CUSTOMERS, payload: 1 })
    }
  }
}
