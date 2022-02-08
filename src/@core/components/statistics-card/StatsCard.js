import React, { useEffect } from 'react'

import CountUp from 'react-countup'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import Spinner from '../spinner/Loading-spinner'
import VisibilitySensor from 'react-visibility-sensor'

import { useSelector, useDispatch } from 'react-redux'
import { handleFetchStats } from '../../../redux/actions/stats'

import { User, Server, UserCheck, Globe, Pocket, HelpCircle } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, Media } from 'reactstrap'

const StatsCard = ({ cols }) => {
  const dispatch = useDispatch()
  const { fetchStatsInProcess, statsData } = useSelector(state => state.stats)

  useEffect(() => {
    dispatch(handleFetchStats())
  }, [])

  const data = [
    {
      title: (
        <CountUp end={`${statsData?.customersCount}`} redraw={true} duration={2}>
          {({ countUpRef, start }) => (
            <VisibilitySensor onChange={start} delayedCall>
              <span ref={countUpRef} />
            </VisibilitySensor>
          )}
        </CountUp>
      ),
      subtitle: 'Customers',
      color: 'light-success',
      icon: <User size={32} />,
    },

    {
      title: (
        <CountUp end={`${statsData?.subscriptionsCount}`} redraw={true} duration={1}>
          {({ countUpRef, start }) => (
            <VisibilitySensor onChange={start} delayedCall>
              <span ref={countUpRef} />
            </VisibilitySensor>
          )}
        </CountUp>
      ),
      subtitle: 'Active Subscriptions',
      color: 'light-info',
      icon: <UserCheck size={32} />,
    },
    {
      title: (
        <CountUp end={`${statsData?.connectionLogsCount}`} redraw={true} duration={1}>
          {({ countUpRef, start }) => (
            <VisibilitySensor onChange={start} delayedCall>
              <span ref={countUpRef} />
            </VisibilitySensor>
          )}
        </CountUp>
      ),
      subtitle: 'VPN Connections',
      color: 'light-danger',
      icon: <Globe size={32} />,
    },
    {
      title: (
        <CountUp end={`${statsData?.serversCount}`} redraw={true} duration={1}>
          {({ countUpRef, start }) => (
            <VisibilitySensor onChange={start} delayedCall>
              <span ref={countUpRef} />
            </VisibilitySensor>
          )}
        </CountUp>
      ),
      subtitle: 'Servers',
      color: 'light-primary',
      icon: <Server size={32} />,
    },
    {
      title: (
        <CountUp end={`${statsData?.plansCount}`} redraw={true} duration={1}>
          {({ countUpRef, start }) => (
            <VisibilitySensor onChange={start} delayedCall>
              <span ref={countUpRef} />
            </VisibilitySensor>
          )}
        </CountUp>
      ),
      subtitle: 'Plans',
      color: 'light-dark',
      icon: <Pocket size={32} />,
    },
    {
      title: (
        <CountUp end={`${statsData?.supportTicketsCount}`} redraw={true} duration={1}>
          {({ countUpRef, start }) => (
            <VisibilitySensor onChange={start} delayedCall>
              <span ref={countUpRef} />
            </VisibilitySensor>
          )}
        </CountUp>
      ),
      subtitle: 'Opened Support Tickets',
      color: 'light-warning',
      icon: <HelpCircle size={32} />,
    },
  ]

  const renderData = () => {
    return data.map((item, index) => {
      const margin = Object.keys(cols)
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2  mb-${margin[0]}-0`]: index !== data.length - 1,
          })}
        >
          <Media className='my-2'>
            <Avatar color={item.color} icon={item.icon} className='mr-2 avatar__padding' />
            <Media className='my-auto' body>
              <h4 className='font-weight-bolder mb-0'>{item.title}</h4>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </Media>
          </Media>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle tag='h4'>Statistics</CardTitle>
        <CardText className='card-text font-small-2 mr-25 mb-0'>Updated 1 month ago</CardText>
      </CardHeader>
      {fetchStatsInProcess ? (
        <Spinner />
      ) : (
        <CardBody className='statistics-body'>
          <Row>{renderData()}</Row>
        </CardBody>
      )}
    </Card>
  )
}

export default StatsCard
