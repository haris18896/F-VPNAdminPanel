import { useEffect } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import { User, CheckSquare, Power } from 'react-feather'

import { handleFetchProfile } from '../../../../redux/actions/admin/fetch.profile/fetchProfileActions'
import { handleLogout } from '../../../../redux/actions/auth/loginActions'

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const { admin } = useSelector(state => state.auth)
  const { profile } = useSelector(state => state.profileUpdate)

  useEffect(() => {
    dispatch(handleFetchProfile())
  }, [dispatch])

  const logoutHandler = () => {
    dispatch(handleLogout())
  }

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name font-weight-bold text-capitalize'>{(profile && profile['name']) || 'Your name'}</span>
          {/* <span className='user-status text-capitalize'>{(admin && admin['role']) || 'admin'}</span> */}
        </div>
        <Avatar img={User} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem to='/profile/update' tag={Link}>
          <User size={14} className='mr-75' />
          <span className='align-middle'>Edit Profile</span>
        </DropdownItem>
        <DropdownItem to='/password/update' tag={Link}>
          <CheckSquare size={14} className='mr-75' />
          <span className='align-middle'>Edit Password</span>
        </DropdownItem>
        <DropdownItem to='#' tag={Link} onClick={logoutHandler}>
          <Power size={14} className='mr-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
