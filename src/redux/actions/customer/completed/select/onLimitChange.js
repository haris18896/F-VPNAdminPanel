import { PAGE_CHANGE_LIST_COMPLETED_CUSTOMERS, SELECT_CHANGE_COMPLETED_CUSTOMERS_LIST } from '../../../actionType/customer'
import { handleCompletedCustomersFetch } from '../../fetch/completed'

export const handleSelectChange = (newLimit, oldLimit, subscriptionStatus, planIdFilterValue) => {
  return async dispatch => {
    if (newLimit !== oldLimit) {
      dispatch(handleCompletedCustomersFetch(1, newLimit, subscriptionStatus, planIdFilterValue))

      dispatch({ type: SELECT_CHANGE_COMPLETED_CUSTOMERS_LIST, payload: newLimit })

      dispatch({ type: PAGE_CHANGE_LIST_COMPLETED_CUSTOMERS, payload: 1 })
    }
  }
}
