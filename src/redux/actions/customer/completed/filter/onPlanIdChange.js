import { PAGE_CHANGE_LIST_COMPLETED_CUSTOMERS, UPDATE_PLAN_FILTER_VALUE_COMPLETED_CUSTOMERS } from '../../../actionType/customer'
import { handleCompletedCustomersFetch } from '../../fetch/completed'

export const handlePlanIdFilterChange = (newValue, oldValue, limit, subscriptionStatus) => {
  return async dispatch => {
    if (newValue !== oldValue) {
      dispatch(handleCompletedCustomersFetch(1, limit, subscriptionStatus, newValue))

      dispatch({ type: UPDATE_PLAN_FILTER_VALUE_COMPLETED_CUSTOMERS, payload: newValue })

      dispatch({ type: PAGE_CHANGE_LIST_COMPLETED_CUSTOMERS, payload: 1 })
    }
  }
}
