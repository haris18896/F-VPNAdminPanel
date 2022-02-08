// ** Config
import themeConfig from '@configs/themeConfig'

const SpinnerComponentSplash = () => {
  return (
    <div className='vh-100 d-flex'>
      <img className='fallback-logo' src={themeConfig.app.appLogoImageDark} alt='logo' />
      <div className='loading'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

export default SpinnerComponentSplash
