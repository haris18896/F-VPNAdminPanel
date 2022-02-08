// ** Config
import themeConfig from '@configs/themeConfig'

import { useSelector } from 'react-redux'

const SpinnerComponent = props => {
  // ** Redux
  const { currentSkin } = useSelector(state => state.skin)
  return (
    <div className='vh-100 d-flex'>
      {currentSkin === '"dark"' || currentSkin === 'dark' ? (
        <img className='fallback-logo' src={themeConfig.app.appLogoImageLight} alt='logo' />
      ) : (
        <img className='fallback-logo' src={themeConfig.app.appLogoImageDark} alt='logo' />
      )}
      <div className='loading'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

export default SpinnerComponent
