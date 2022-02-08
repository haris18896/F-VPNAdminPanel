import { PAGE_CHANGE_LIST_COMPLETED_CUSTOMERS, RESET_COMPLETED_CUSTOMERS_LIST_FILTERS } from '../../../actionType/customer'
import { handleCompletedCustomersFetch } from '../../fetch/completed'

export const handleResetCompletedCustomersFilters = (page, limit, subscriptionStatus, planIdFilterValue) => {
  return async dispatch => {
    if (subscriptionStatus || planIdFilterValue) {
      dispatch({ type: RESET_COMPLETED_CUSTOMERS_LIST_FILTERS })

      dispatch(handleCompletedCustomersFetch(1, limit, 'enabled', ''))

      dispatch({ type: PAGE_CHANGE_LIST_COMPLETED_CUSTOMERS, payload: 1 })
    }
  }
}
