import { CardHeader, CardText, Nav, NavItem, NavLink } from 'reactstrap'
import Card from 'reactstrap/lib/Card'
import CardBody from 'reactstrap/lib/CardBody'
import CardTitle from 'reactstrap/lib/CardTitle'
import { Link } from 'react-router-dom'

const Menu = props => {
  const { currentActive } = props
  return (
    <Card>
      <CardHeader>
        <CardTitle>VPN Settings</CardTitle>
      </CardHeader>

      <CardBody>
        <Nav pills>
          <NavItem>
            <Link to='/settings/vpn/blockedapps'>
              <NavLink {...(currentActive === 'blockedApps' ? { active: true } : undefined)}>Blocked Apps Settings</NavLink>
            </Link>
          </NavItem>
        </Nav>
      </CardBody>
    </Card>
  )
}

export default Menu
