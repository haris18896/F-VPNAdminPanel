/* eslint-disable */
import { Card, CardBody, Table } from 'reactstrap'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Edit } from 'react-feather'
import { handleFetchPlans } from '../../../redux/actions/plans/fetch'
import { RESET_PLAN_STATE } from '../../../redux/actions/actionType/plan/reset'
import Spinner from '../../common/Spinner'
import Menu from '../menu/Menu'


const plans = () => {
  const dispatch = useDispatch()
  const { plansFetchingInProcess, plans } = useSelector(state => state.plan)

  useEffect(() => {
    dispatch(handleFetchPlans())
    return () => {
      dispatch({ type: RESET_PLAN_STATE })
    }
  }, [])

  return (
    <Card>
      <CardBody>
        <Menu currentActive='plans' />
      </CardBody>

      {plansFetchingInProcess ? (
        <Spinner />
      ) : plans && plans.length >= 1 ? (
        <Table responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Currency</th>
              <th>Monthly Fee</th>
              <th>Trial Period (Days)</th>
              <th>Total Fee</th>
              <th>Discount (%)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan._id}>
                <td>
                  <span className='align-middle font-weight-bold'>{plan._id}</span>
                </td>
                <td className='text-truncate'>{plan.name}</td>
                <td>{plan.currency}</td>
                <td>{plan.monthlyFee}</td>
                <td>{plan.trialAllowed ? plan.trialPeriodInDays : 0}</td>
                <td>{plan.totalFee}</td>
                <td>{plan.discount}%</td>
                <td>
                  <Link to={`/plan-update/${plan._id}`}>
                    <Edit style={{ cursor: 'pointer' }} className='mr-50 text-success' size={15} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h1>No Plans Found!</h1>
      )}
    </Card>
  )
}

export default plans
