import Menu from '../menu/Menu'
import Card from 'reactstrap/lib/Card'
import CardBody from 'reactstrap/lib/CardBody'
const AppUpdate = () => {
  return (
    <Card>
      <Menu currentActive='update' />
      <CardBody>
        <h1>App Update Configurations</h1>
      </CardBody>
    </Card>
  )
}

export default AppUpdate
