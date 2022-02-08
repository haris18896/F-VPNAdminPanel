import { Nav, NavItem, NavLink } from 'reactstrap'
import CardTitle from 'reactstrap/lib/CardTitle'
import { Link } from 'react-router-dom'

const Menu = props => {
  const { currentActive } = props
  return (
    <div>
      <CardTitle>Plans</CardTitle>
      <Nav pills>
        <NavItem>
          <Link to='/plans'>
            <NavLink {...(currentActive === 'plans' && { active: true })}>Plans</NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link to='/add-plan'>
            <NavLink href='/add-plan' {...(currentActive === 'addPlan' && { active: true })}>Add Plan</NavLink>
          </Link>
        </NavItem>
        {currentActive === 'updatePlan' && (
          <NavItem>
            <NavLink {...(currentActive === 'updatePlan' && { active: true })}>Update Plan</NavLink>
          </NavItem>
        )}
      </Nav>
    </div>
  )
}

export default Menu
