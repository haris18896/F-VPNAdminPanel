import { CardHeader, CardText, Nav, NavItem, NavLink, Tooltip } from 'reactstrap'
import Card from 'reactstrap/lib/Card'
import CardBody from 'reactstrap/lib/CardBody'
import CardTitle from 'reactstrap/lib/CardTitle'
import { Link } from 'react-router-dom'
import { useState } from 'react'
// import {} from 'reactstrap'

const Menu = props => {
  const { currentActive } = props
  const [tooltipOpen, setTooltipOpen] = useState(false)

  const toggle = () => setTooltipOpen(!tooltipOpen)
  return (
    <div>
      <CardTitle>City Menu</CardTitle>
      <Nav pills>
        <NavItem>
          <Link to='/cities'>
            <NavLink {...(currentActive === 'cities' ? { active: true } : undefined)}>Cities</NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link to='/add-city'>
            <NavLink {...(currentActive === 'addCity' ? { active: true } : undefined)}>Add City</NavLink>
          </Link>
        </NavItem>

        {currentActive === 'updateCity' ? (
          <NavItem>
            <NavLink {...(currentActive === 'updateCity' ? { active: true } : undefined)}>Update City</NavLink>
          </NavItem>
        ) : (
          ''
        )}
      </Nav>
    </div>
  )
}

export default Menu
