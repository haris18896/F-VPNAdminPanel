import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { Card, Label, Input, Row, Table, Col } from 'reactstrap'
import { handleSelectChangeListTransactionsDetails } from '../../../../redux/actions/customer/fetch/transaction/select/onSelectLimit'
import { handlePageChangeListTransactionsDetails } from '../../../../redux/actions/customer/fetch/transaction/select/onSelectPage'
import { FormattedDate } from 'react-intl'
import { formatDate } from '../../../../utility/Utils'

const TransactionsDetails = props => {
  const { customerId } = props
  const dispatch = useDispatch()

  const { transactionsListData, transactionsPage, transactionsLimit } = useSelector(state => state.customerDetails)

  // ** FUNCTION TO HANDLE PAGINATION
  const handlePagination = page => {
    dispatch(handlePageChangeListTransactionsDetails(page, transactionsLimit, customerId))
  }

  // ** CUSTOM PAGINATION COMPONENT
  const CustomPagination = () => {
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        breakLabel='...'
        pageCount={(transactionsListData && transactionsListData.totalPages) || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName='active'
        forcePage={transactionsPage !== 0 ? transactionsPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName={'pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'}
      />
    )
  }

  const onSelectInputChangeHandler = e => {
    dispatch(handleSelectChangeListTransactionsDetails(e.target.value, transactionsLimit, customerId, transactionsPage))
  }

  return (
    <Fragment>
      {transactionsListData && transactionsListData.transactions && transactionsListData.transactions.length >= 1 ? (
        <Card>
          <Row className='mx-0 mt-1 justify-content-between '>
            <Col sm={12} md={6} lg={4} className='mb-1'>
              <div className='d-flex align-items-center'>
                <Label className='mx-2' for='sort-select'>
                  Show
                </Label>
                <Input
                  style={{ width: '70px' }}
                  className='dataTable-select mr-1'
                  type='select'
                  id='sort-select'
                  value={transactionsLimit}
                  name='transactionsLimit'
                  onChange={onSelectInputChangeHandler}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </Input>
              </div>
            </Col>
          </Row>

          <Table responsive={true}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Payment Method</th>
                <th>Currency</th>
                <th>Internal ID</th>
                <th>Customer Name</th>
                <th>Customer Email</th>
                <th>Plan</th>
                <th>Subscription Start Time</th>
                <th>Subscription End Time</th>
                <th>Total Fee</th>
                <th>Mode</th>
                <th>Status</th>
                <th>Transaction Time</th>
              </tr>
            </thead>

            <tbody>
              {transactionsListData.transactions.map(transaction => (
                <tr key={transaction._id}>
                  <td>
                    <span className='align-middle font-weight-bold'>{transaction._id}</span>
                  </td>
                  <td>{transaction.paymentMethod}</td>
                  <td>{transaction.currency}</td>
                  <td>{transaction.internalId}</td>
                  <td>{transaction.customer && transaction.customer.name ? transaction.customer.name : 'Null'}</td>
                  <td>{transaction.customer && transaction.customer.email ? transaction.customer.email : 'Null'}</td>
                  <td>{transaction.plan && transaction.plan.name ? transaction.plan.name : 'Null'}</td>
                  <td>{formatDate(transaction.subscriptionStartTime)}</td>
                  <td>{formatDate(transaction.subscriptionExpiryTime)}</td>
                  <td>{transaction.totalFee}</td>
                  <td>{transaction.mode}</td>
                  <td>{transaction.status}</td>
                  <td>{formatDate(transaction.transactionTime)}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <CustomPagination />
        </Card>
      ) : (
        <p>No Record Found!</p>
      )}
    </Fragment>
  )
}

export default TransactionsDetails
