import { CardHeader, CardText, Nav, NavItem, NavLink } from 'reactstrap'
import Card from 'reactstrap/lib/Card'
import CardBody from 'reactstrap/lib/CardBody'
import CardTitle from 'reactstrap/lib/CardTitle'
import { Link } from 'react-router-dom'

const Menu = props => {
  const { currentActive } = props
  return (
    <div>
      <CardTitle>App Settings</CardTitle>
      <Nav pills>
        <Link to='/settings/app/ad'>
          <NavItem>
            <NavLink to='/settings/app/ad' {...(currentActive === 'ad' ? { active: true } : undefined)}>
              Ad Setting
            </NavLink>
          </NavItem>
        </Link>
        <Link to='/settings/app/payment'>
          <NavItem>
            <NavLink {...(currentActive === 'payment' ? { active: true } : undefined)}>Payment Setting</NavLink>
          </NavItem>
        </Link>
        <Link to='/settings/app/notification'>
          <NavItem>
            <NavLink {...(currentActive === 'notification' ? { active: true } : undefined)}>Notification Setting</NavLink>
          </NavItem>
        </Link>
      </Nav>
    </div>
  )
}

export default Menu
