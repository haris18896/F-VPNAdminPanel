// ** Dropdowns Imports
import { Fragment } from 'react'

import UserDropdown from './UserDropdown'

// ** Using dispatch
import { useDispatch } from 'react-redux'

// ** Third Party Components
import { Sun, Moon, Menu } from 'react-feather'
import { NavItem, NavLink } from 'reactstrap'

const NavbarUser = props => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props

  // ** Dispatch
  const dispatch = useDispatch()

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return (
        <Sun
          className='ficon'
          onClick={() => {
            setSkin('light')
            dispatch({ type: 'SET_SKIN', payload: 'light' })
          }}
        />
      )
    } else {
      return (
        <Moon
          className='ficon'
          onClick={() => {
            setSkin('dark')
            dispatch({ type: 'SET_SKIN', payload: 'dark' })
          }}
        />
      )
    }
  }

  return (
    <Fragment>
      <ul className='navbar-nav d-xl-none d-flex align-items-center'>
        <NavItem className='mobile-menu mr-auto'>
          <NavLink className='nav-menu-main menu-toggle hidden-xs is-active' onClick={() => setMenuVisibility(true)}>
            <Menu className='ficon' />
          </NavLink>
        </NavItem>
      </ul>
      <div className='bookmark-wrapper d-flex align-items-center'>
        <NavItem className='d-block'>
          <NavLink className='nav-link-style'>
            <ThemeToggler />
          </NavLink>
        </NavItem>
      </div>
      <ul className='nav navbar-nav align-items-center ml-auto'>
        <UserDropdown />
      </ul>
    </Fragment>
  )
}
export default NavbarUser
