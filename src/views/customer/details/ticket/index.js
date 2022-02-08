import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { Card, Label, Input, Row, Table, Col } from 'reactstrap'
import { handleSelectChangeListTicketsDetails } from '../../../../redux/actions/customer/fetch/tickets/select/onSelectLimit'

const TicketsDetails = props => {
  const { customerId } = props
  const dispatch = useDispatch()

  const { supportTicketsListData, supportTicketsPage, supportTicketsLimit } = useSelector(state => state.customerDetails)

  // ** FUNCTION TO HANDLE PAGINATION
  const handlePagination = page => {
    dispatch(handlePageChangeListTicketsDetails(supportTicketsPage, supportTicketsLimit, customerId))
  }

  // ** CUSTOM PAGINATION COMPONENT
  const CustomPagination = () => {
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        breakLabel='...'
        pageCount={(supportTicketsListData && supportTicketsListData.totalPages) || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName='active'
        forcePage={supportTicketsPage !== 0 ? supportTicketsPage - 1 : 0}
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
    dispatch(handleSelectChangeListTicketsDetails(e.target.value, supportTicketsLimit, customerId, supportTicketsPage))
  }

  return (
    <Fragment>
      {supportTicketsListData && supportTicketsListData.supportTickets && supportTicketsListData.supportTickets.length >= 1 ? (
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
                  value={supportTicketsLimit}
                  name='supportTicketsLimit'
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

          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Customer Name</th>
                <th>Customer Email</th>
                <th>Subject</th>
                <th>Message</th>
              </tr>
            </thead>

            <tbody>
              {supportTicketsListData.supportTickets.map(ticket => (
                <tr key={ticket._id}>
                  <td>
                    <span className='align-middle font-weight-bold'>{ticket._id}</span>
                  </td>
                  <td>{ticket.severity}</td>
                  <td>{ticket.status}</td>
                  <td>{ticket.customer && ticket.customer.name ? ticket.customer.name : 'Null'}</td>
                  <td>{ticket.customer && ticket.customer.email ? ticket.customer.email : 'Null'}</td>
                  <td>{ticket.subject}</td>
                  <td>{ticket.message}</td>
                  {/* <td style={{ cursor: 'pointer' }} onClick={closeTicket.bind(this, ticket._id, ticket.status)}>
        Close Ticket
      </td> */}
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

export default TicketsDetails
