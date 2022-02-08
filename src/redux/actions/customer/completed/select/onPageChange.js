import { PAGE_CHANGE_LIST_COMPLETED_CUSTOMERS } from '../../../actionType/customer'
import { handleCompletedCustomersFetch } from '../../fetch/completed'

export const handlePageChange = (page, limit, subscriptionStatus, planIdFilterValue) => {
  return async dispatch => {
    const newPage = page.selected + 1
    dispatch({ type: PAGE_CHANGE_LIST_COMPLETED_CUSTOMERS, payload: newPage })

    dispatch(handleCompletedCustomersFetch(newPage, limit, subscriptionStatus, planIdFilterValue))
  }
}
