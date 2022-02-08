import { Fragment } from 'react'
import { Table, Card, Row, Col } from 'reactstrap'
import { formatDate } from '../../../../utility/Utils'
const CustomerSubscriptionDetails = ({ subscription }) => {
  return (
    <Fragment>
      <Card>
        <Row>
          <Col style={{ marginBottom: '55px' }}>
            <Table responsive>
              <thead>
                <tr>
                  <th>Plan</th>
                  <th>Next Plan</th>
                  <th>Status</th>
                  <th>On Trial</th>
                  <th>Auto Renew</th>
                  <th>Subscription Start Time</th>
                  <th>Subscription End Time</th>
                </tr>
              </thead>
              <tbody>
                <tr key={subscription._id}>
                  <td>{subscription.plan}</td>
                  <td>{subscription.nextPlan ? subscription.nextPlan : 'NULL'}</td>
                  <td>{subscription.status}</td>
                  <td>{subscription.onTrial ? 'Yes' : 'No'}</td>
                  <td>{subscription.autoRenewal ? 'Yes' : 'No'}</td>
                  <td>{formatDate(subscription.startTime)}</td>
                  <td>{formatDate(subscription.expiryTime)}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Card>
    </Fragment>
  )
}

export default CustomerSubscriptionDetails
