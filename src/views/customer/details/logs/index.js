import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { Card, Label, Input, Row, Table, Col } from 'reactstrap'
import { handleSelectChangeListConnectionLogsDetails } from '../../../../redux/actions/customer/fetch/logs/select/onSelectLimit'
import { formatDate } from '../../../../utility/Utils'

const LogDetails = props => {
  const { customerId } = props
  const dispatch = useDispatch()

  const { logsListData, logsPage, logsLimit } = useSelector(state => state.customerDetails)

  // ** FUNCTION TO HANDLE PAGINATION
  const handlePagination = page => {
    dispatch(handlePageChangeListConnectionLogsDetails(page, logsLimit, customerId))
  }

  // ** CUSTOM PAGINATION COMPONENT
  const CustomPagination = () => {
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        breakLabel='...'
        pageCount={(logsListData && logsListData.totalPages) || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName='active'
        forcePage={logsPage !== 0 ? logsPage - 1 : 0}
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
    dispatch(handleSelectChangeListConnectionLogsDetails(e.target.value, logsLimit, customerId))
  }

  return (
    <Fragment>
      {logsListData && logsListData.vpnConnectionLogs && logsListData.vpnConnectionLogs.length >= 1 ? (
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
                  value={logsLimit}
                  name='logsLimit'
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
                <th>Customer Name</th>
                <th>Customer Email</th>
                <th>Client ID</th>
                <th>Real IP</th>
                <th>Virtual IP</th>
                <th>Server ID</th>
                <th>Server Protocol</th>
                <th>Server Country</th>
                <th>Server City</th>
                <th>Server IP</th>
                <th>Mac Address</th>
                <th>Port</th>
                <th>Connection Time</th>
                <th>OS Platform</th>
                <th>OS Version</th>
                <th>Open VPN Version</th>
                <th>Open VPN GUI Version</th>
              </tr>
            </thead>

            <tbody>
              {logsListData.vpnConnectionLogs.map(log => (
                <tr key={log._id}>
                  <td>
                    <span className='align-middle font-weight-bold'>{log._id.substring(log._id.length - 5)}</span>
                  </td>

                  <td>{log.customer && log.customer.name ? log.customer.name : 'Null'}</td>
                  <td>{log.customer && log.customer.email ? log.customer.email : 'Null'}</td>
                  <td>{log.clientId}</td>
                  <td>{log.realIP}</td>
                  <td>{log.virtualIP}</td>
                  <td>{log.server._id}</td>
                  <td>{log.server.protocol}</td>
                  <td>{log.server.country && log.server.country.name ? log.server.country.name : 'Null'}</td>
                  <td>{log.server.city && log.server.city.name ? log.server.city.name : 'Null'}</td>
                  <td>{log.server.ipv4Address || 'Null'}</td>
                  <td>{log.macAddress || 'Null'}</td>
                  <td>{log.port}</td>
                  <td className='text-truncate'>{formatDate(log.connectionTime)}</td>
                  <td>{log.osPlatform || 'Null'}</td>
                  <td>{log.osVersion || 'Null'}</td>
                  <td>{log.openvpnVersion || 'Null'}</td>
                  <td>{log.openvpnGUIVersion || 'Null'}</td>
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

export default LogDetails
