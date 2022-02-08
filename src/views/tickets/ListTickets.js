/* eslint-disable */
import ReactPaginate from 'react-paginate'
import React, { useState, useEffect, Fragment, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RefreshCw } from 'react-feather'
import { MAIN_SERVICE_URL } from '../../constants/consts'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Table } from 'reactstrap'
import { handleTicketsFetch } from '../../redux/actions/ticket/fetch/fetchTicketsActions'
import { handleSelectChangeListTickets } from '../../redux/actions/ticket/fetch/select/onSelectLimit'
import { handlePageChangeListTickets } from '../../redux/actions/ticket/fetch/select/onSelectPage'
import { handleSeverityFilterUpdate } from '../../redux/actions/ticket/fetch/filter/severityChange'
import { handleStatusFilterUpdate } from '../../redux/actions/ticket/fetch/filter/statusChange'
import { handleResetFilters } from '../../redux/actions/ticket/fetch/filter/reset'
import { handleCloseSupportTicket } from '../../redux/actions/ticket/close/closeSupportTicketActions'
import { handleTicketsFetchNoUpdatesVersion } from '../../redux/actions/ticket/fetch/search/onSearch'
import { RESET_TICKETS_LIST_STATE } from '../../redux/actions/actionType/ticket/fetch'

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

const ListTickets = () => {
  const initialState = {
    url: `${MAIN_SERVICE_URL}/vpn/supportTicket/listSupportTickets`,
    searchKeyword: '',
  }

  const [state, setState] = useState(initialState)
  const [searchString, setSearchString] = useState('')

  // DISPATCH
  const dispatch = useDispatch()

  // EXTRACTING STUFF FROM REDUX GLOBAL STATE
  const { inProcess, limit, page, totalPages, ticketsListData, severityFilterValue, statusFilterValue } = useSelector(
    state => state.ticketList
  )

  // ** FUNCTION TO HANDLE PAGINATION
  const handlePagination = page => {
    dispatch(handlePageChangeListTickets(page, limit, statusFilterValue, severityFilterValue))
  }

  // ** CUSTOM PAGINATION COMPONENT
  const CustomPagination = () => {
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        breakLabel='...'
        pageCount={totalPages || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName='active'
        forcePage={page !== 0 ? page - 1 : 0}
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

  // ** onChangeHandler FOR KEY WORD SEARCH INPUT
  const onChangeHandler = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  // ON STATUS FILTER CHANGE **
  const statusFilterChange = e => {
    if (severityFilterValue) {
      dispatch(handleStatusFilterUpdate(e.target.value, statusFilterValue, limit, severityFilterValue))
    } else {
      dispatch(handleStatusFilterUpdate(e.target.value, statusFilterValue, limit))
    }
  }

  // ON SEVERITY FILTER CHANGE **
  const severityFilterChange = e => {
    if (statusFilterValue) {
      dispatch(handleSeverityFilterUpdate(e.target.value, severityFilterValue, limit, statusFilterValue))
    } else {
      dispatch(handleSeverityFilterUpdate(e.target.value, severityFilterValue, limit))
    }
  }

  // ** ON FILTERS RESET
  const resetFilters = () => {
    dispatch(handleResetFilters(page, limit, statusFilterValue, severityFilterValue))
  }

  // ** UPDATE SEARCH STRING WHENEVER YOU TYPE A CERTAIN KEYWORD
  useEffect(() => {
    if (state.searchKeyword !== '') {
      const searchStr = `?searchKeyword=${state.searchKeyword}`
      setSearchString(searchStr)
    } else {
      setSearchString('')
    }
  }, [state.searchKeyword])

  // ** GET UPDATED DATA OF THE ADMINS WHEN EVER SEARCH STRING UPDATES
  useEffect(() => {
    if (searchString) {
      dispatch(handleTicketsFetchNoUpdatesVersion(page, limit, statusFilterValue, severityFilterValue, state.searchKeyword))
    }
  }, [searchString])

  const onSelectInputChangeHandler = e => {
    dispatch(handleSelectChangeListTickets(e.target.value, limit, statusFilterValue, severityFilterValue))
  }

  // ** ON MOUNT
  useEffect(() => {
    // INITIALLY FETCHING TICKETS WITH THESE CONFIGURATIONS
    dispatch(handleTicketsFetch(page, limit))
  }, [])

  // ** CLOSE TICKET HANDLER
  const closeTicket = (id, status) => {
    // eslint-disable-next-line no-restricted-globals

    // alert(status)
    if (status === 'opened') {
      if (confirm('Are you sure you want to close the ticket with ID: ' + id)) {
        dispatch(handleCloseSupportTicket(id, page, limit, statusFilterValue, severityFilterValue, state.searchKeyword))
      }
    }
  }

  // ** ON UNMOUNT
  useEffect(() => {
    // ** CLEARING TICKET LIST REDUX STATE
    return () => dispatch({ type: RESET_TICKETS_LIST_STATE })
  }, [])

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Support Tickets</CardTitle>
        </CardHeader>
        <Row className='mx-0 mt-1 mb-75 justify-content-between '>
          <Col sm={12} md={6} lg={4} className='mb-1'>
            <div className='d-flex align-items-center'>
              <Label className='mr-1' for='sort-select'>
                Show
              </Label>
              <Input
                style={{ width: '70px' }}
                className='dataTable-select mr-1'
                type='select'
                id='sort-select'
                value={limit}
                name='limit'
                onChange={onSelectInputChangeHandler}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </Input>
            </div>
          </Col>
          <Col sm={12} md={6} lg={4} className='mb-1'>
            <div className='d-flex align-items-center justify-content-lg-start'>
              <Label for='exampleSelect' className='mr-1'>
                Serverity
              </Label>
              <Input
                type='select'
                name='select'
                id='exampleSelect'
                onChange={severityFilterChange}
                style={{ width: '120px' }}
                value={severityFilterValue}
              >
                <option value=''>Choose...</option>
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
              </Input>
            </div>
          </Col>
          <Col sm={12} md={6} lg={4} className='mb-1'>
            <div className='d-flex align-items-center justify-content-lg-start'>
              <Label for='exampleSelect' className='mr-1'>
                Status
              </Label>
              <Input
                type='select'
                name='select'
                id='exampleSelect'
                onChange={statusFilterChange}
                style={{ width: '120px' }}
                value={statusFilterValue}
              >
                <option value=''>Choose...</option>
                <option value='opened'>Opened</option>
                <option value='closed'>Closed</option>
              </Input>
            </div>
          </Col>

          <Col sm={12} md={6} lg={6} className='mb-1'>
            <Label for='Reset Filters' className='mr-1'>
              Reset Filters
            </Label>
            <RefreshCw style={{ cursor: 'pointer' }} onClick={resetFilters} size={20} />
          </Col>
          {/* </Row> */}
          <Col className='d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1' sm='12' md={4}>
            <Label className='mr-1' for='search-input'>
              Search
            </Label>
            <Input
              className='dataTable-filter'
              type='text'
              bsSize='sm'
              id='search-input'
              // value={searchValue}
              onChange={onChangeHandler}
              name='searchKeyword'
            />
          </Col>
        </Row>

        {inProcess ? (
          <ComponentSpinner />
        ) : ticketsListData && ticketsListData.supportTickets.length >= 1 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Customer Name</th>
                <th>Customer Email</th>
                <th>Subject</th>
                <th style={{ width: '2px' }}>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ticketsListData.supportTickets.map(ticket => (
                <tr key={ticket._id}>
                  <td>
                    <span className='align-middle font-weight-bold'>{ticket._id}</span>
                  </td>
                  <td>{ticket.severity}</td>
                  <td>{ticket.status}</td>
                  <td>{ticket.customer && ticket.customer.name ? ticket.customer.name : 'Null'}</td>
                  <td className='text-truncate'>{ticket.customer && ticket.customer.email ? ticket.customer.email : 'Null'}</td>
                  <td>{ticket.subject}</td>
                  <td>{ticket.message}</td>
                  <td style={{ cursor: 'pointer' }} onClick={closeTicket.bind(this, ticket._id, ticket.status)}>
                    Close Ticket
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Card>
            <CardHeader>No Record Found!</CardHeader>
          </Card>
        )}

        <CustomPagination />
      </Card>
    </Fragment>
  )
}

export default memo(ListTickets)
