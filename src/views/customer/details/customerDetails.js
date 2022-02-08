/* eslint-disable */
import { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardBody, CardTitle, Table } from 'reactstrap'
import { handleFetchSubscriptionDetails } from '../../../redux/actions/customer/fetch/subscription'
import { handleFetchCustomerDetails } from '../../../redux/actions/customer/fetch/customer'
import { handleFetchConnectionLogsDetails } from '../../../redux/actions/customer/fetch/logs'
import CustomerSubscriptionDetails from './subscription'
import { handleFetchTransactionDetails } from '../../../redux/actions/customer/fetch/transaction'
import TransactionsDetails from './transaction'
import LogDetails from './logs'
import { RESET_CUSTOMER_DETAILS } from '../../../redux/actions/actionType/customer'

const ComponentSpinner = () => {
  return (
    <div className='fallback-spinner' style={{ marginTop: '600px' }}>
      <div className='loading component-loader'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const customerDetails = () => {
  const params = useParams()
  const query = useQuery()

  const { id } = params
  const subscriptionStatus = query.get('subscriptionStatus')

  const {
    subscription,
    customer,
    fetchCustomerDetailsInProcess,
    fetchSubscriptionDetailsInProcess,
    fetchConnectionLogsInitiated,
    fetchTransactionsInProcess,
  } = useSelector(state => state.customerDetails)
  const dispatch = useDispatch()

  useEffect(() => {
    //  FETCH SUBSCRIPTION DETAILS OF A CUSTOMER WITH ID
    if (id) {
      dispatch(handleFetchCustomerDetails(id, subscriptionStatus))
      dispatch(handleFetchConnectionLogsDetails(id))
      dispatch(handleFetchSubscriptionDetails(id, subscriptionStatus))
      dispatch(handleFetchTransactionDetails(id))
    }
  }, [id, subscriptionStatus])

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_CUSTOMER_DETAILS })
    }
  }, [])

  return fetchCustomerDetailsInProcess ||
    fetchSubscriptionDetailsInProcess ||
    fetchConnectionLogsInitiated ||
    fetchTransactionsInProcess ? (
    <ComponentSpinner />
  ) : (
    <Card>
      <CardBody>
        <Card>
          <CardTitle>Customer Details</CardTitle>
          {customer && customer._id ? (
            <Table style={{ marginBottom: '65px' }} responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Language Preference</th>
                </tr>
              </thead>
              <tbody>
                <tr key={customer._id}>
                  <td>
                    <span className='align-middle font-weight-bold'>{customer._id}</span>
                  </td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.preferences && customer.preferences.language ? customer.preferences.language : 'Null'}</td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <p>Record not found!</p>
          )}
        </Card>

        <Card>
          <CardTitle>Connection Logs Details</CardTitle>
          <LogDetails customerId={id} />
        </Card>

        <Card>
          <CardTitle>Subsciption Details</CardTitle>
          {subscription && subscription.plan ? (
            <CustomerSubscriptionDetails subscription={subscription} />
          ) : (
            <p>This customer has not subscribed to the plans yet!</p>
          )}
        </Card>

        <Card>
          <CardTitle>Transactions Details</CardTitle>
          <TransactionsDetails customerId={id} />
        </Card>
      </CardBody>
    </Card>
  )
}

export default customerDetails
