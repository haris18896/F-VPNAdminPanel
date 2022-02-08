// ** React Imports
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

// ** Third Party Components
import { Disc, X, Circle } from 'react-feather'

// ** Config
import themeConfig from '@configs/themeConfig'

const VerticalMenuHeader = props => {
  // ** Props
  const { menuCollapsed, setMenuCollapsed, setMenuVisibility, setGroupOpen, menuHover } = props

  // ** Redux
  const { currentSkin } = useSelector(state => state.skin)

  // ** Reset open group
  useEffect(() => {
    if (!menuHover && menuCollapsed) setGroupOpen([])
  }, [menuHover, menuCollapsed])

  // ** Menu toggler component
  const Toggler = () => {
    if (!menuCollapsed) {
      return (
        <Disc
          size={20}
          data-tour='toggle-icon'
          className='text-primary toggle-icon d-none d-xl-block'
          onClick={() => setMenuCollapsed(true)}
        />
      )
    } else {
      return (
        <Circle
          size={20}
          data-tour='toggle-icon'
          className='text-primary toggle-icon d-none d-xl-block'
          onClick={() => setMenuCollapsed(false)}
        />
      )
    }
  }

  return (
    <div className='navbar-header'>
      <ul className='nav navbar-nav flex-row'>
        <li className='nav-item mr-auto'>
          <NavLink to='/' className='navbar-brand'>
            {/* <span className='brand-logo'></span> */}

            {!menuCollapsed ? (
              currentSkin === '"dark"' || currentSkin === 'dark' ? (
                <img src={themeConfig.app.appLogoImageLight} alt='logo-dark' height='30px' />
              ) : (
                <img src={themeConfig.app.appLogoImageDark} alt='logo-dark' height='30px' />
              )
            ) : currentSkin === '"dark"' || currentSkin === 'dark' ? (
              <img src={themeConfig.app.appLogoImage02} alt='logo-dark' height='30px' />
            ) : (
              <img src={themeConfig.app.appLogoImage01} alt='logo-dark' height='38px' />
            )}

            {/* {currentSkin === '"dark"' || currentSkin === 'dark' ? (
              <img src={themeConfig.app.appLogoImageLight} alt='logo-dark' height='30px' />
            ) : (
              <img src={themeConfig.app.appLogoImageDark} alt='logo-dark' height='30px' />
            )} */}

            {/* <h2 className='brand-text mb-0'>{themeConfig.app.appName}</h2> */}
          </NavLink>
        </li>
        <li className='nav-item nav-toggle'>
          <div className='nav-link modern-nav-toggle cursor-pointer'>
            <Toggler />
            <X onClick={() => setMenuVisibility(false)} className='toggle-icon icon-x d-block d-xl-none' size={20} />
          </div>
        </li>
      </ul>
    </div>
  )
}

export default VerticalMenuHeader
