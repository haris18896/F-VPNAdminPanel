import { Row, Col } from 'reactstrap'
import StatsCard from '../@core/components/statistics-card/StatsCard.js'

const Home = () => {
  return (
    <div>
      <Row className='match-height'>
        <Col xl='12' md='12' xs='12'>
          <StatsCard cols={{ xl: '4', md: '6' }} />
        </Col>
      </Row>
    </div>
  )
}

export default Home
