import { PAGE_CHANGE_LIST_PENDING_CUSTOMERS, SELECT_CHANGE_PENDING_CUSTOMERS_LIST } from '../../../actionType/customer'
import { handlePendingCustomersFetch } from '../../fetch/pending/index'

export const handleSelectChange = (newLimit, oldLimit) => {
  return async dispatch => {
    if (newLimit !== oldLimit) {
      dispatch(handlePendingCustomersFetch(1, newLimit))

      dispatch({ type: SELECT_CHANGE_PENDING_CUSTOMERS_LIST, payload: newLimit })

      dispatch({ type: PAGE_CHANGE_LIST_PENDING_CUSTOMERS, payload: 1 })
    }
  }
}
