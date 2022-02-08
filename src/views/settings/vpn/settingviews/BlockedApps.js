/* eslint-disable */
import { useState, useEffect } from 'react'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { isObjEmpty } from '@utils'
import { Card, CardBody, CardTitle, Form, Input, FormGroup, Label, Button, Row, Col, CardText } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import Menu from '../menu/Menu'
import { handleAdUpdate } from '../../../../redux/actions/settings/app/update/ad'
import { handleFetchAdSettings } from '../../../../redux/actions/settings/app/fetch/ad'
import { CLEAR_APP_SETTING_STATE } from '../../../../redux/actions/actionType/settings/clear'
import { handleFetchBlockedAppsSettings } from '../../../../redux/actions/settings/vpn/fetch/blockedapps'
import { handleUpdateBlockedAppsSettings } from '../../../../redux/actions/settings/vpn/update/blockedapps'

const ComponentSpinner = () => {
  return (
    <div className='fallback-spinner' style={{ marginTop: '500px' }}>
      <div className='loading component-loader'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

const BlockedApps = () => {
  const [customString, setCustomString] = useState('')

  const { register, errors, handleSubmit } = useForm()
  const dispatch = useDispatch()

  // EXTRACTING STUFF FROM REDUX
  const { inProcess, blockedApps, status } = useSelector(state => state.setting)

  const onChangeFacebookState = e => {
    setFacebookState({ ...facebookState, [e.target.name]: e.target.value })
  }

  const onChangeAdMobState = e => {
    setAdMobState({ ...adMobState, [e.target.name]: e.target.value })
  }

  const onSubmit = formData => {
    // alert('Hello')

    if (isObjEmpty(errors)) {
      let blockedAppsFromArray = customString.split('\n')
      let data = {
        blockedApps: blockedAppsFromArray,
      }

      dispatch(handleUpdateBlockedAppsSettings(data))
    }
  }

  useEffect(() => {
    if (blockedApps) {
      let str = ''
      blockedApps.map(app => (str += app + ' '))
      let splitted = str.split(' ')
      let splittedWithBr = ''
      splitted.map(singleSplit => (splittedWithBr += singleSplit + '\n'))
      splittedWithBr = splittedWithBr.slice(0, -2)
      setCustomString(splittedWithBr)
    }
  }, [blockedApps])

  useEffect(() => {
    dispatch(handleFetchBlockedAppsSettings())
  }, [])

  useEffect(() => {
    return () => {
      dispatch({ type: CLEAR_APP_SETTING_STATE })
    }
  }, [])
  return (
    <Card>
      <Menu currentActive='blockedApps' />

      {inProcess ? (
        <ComponentSpinner />
      ) : (
        <CardBody>
          {/* <Row> */}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md='6' sm='12' className='mb-3 mb-md-0'>
                <FormGroup>
                  {/* <CardTitle className='text-primary'>Blocked Apps</CardTitle> */}
                  <Label className='form-label' for='customString'>
                    Blocked Apps Settings
                  </Label>

                  <Input
                    type='textarea'
                    autoFocus
                    value={customString}
                    onChange={e => setCustomString(e.target.value)}
                    rows={(blockedApps && blockedApps.length) || 6}
                    id='customString'
                    name='customString'
                    // className={classnames({ 'is-invalid': errors['customString'] })}
                    // innerRef={register({ required: true, validate: value => value !== '' })}
                  />

                  {/* <input type='textarea' cols={6} /> */}
                  {/* <Input
                    // required={true}

                    type='textarea'
                    // value={}
                    id='blockedApps'
                    name='blockedApps'
                    // onChange={}
                  >

                  </Input> */}
                </FormGroup>
              </Col>
              <Col sm='12'>
                {status === 'SUCCESS' ? <p className='text-success'>Blocked apps settings updated successfully!</p> : ''}
                <FormGroup className='d-flex mt-1'>
                  <Button.Ripple className='mr-1' color='primary' type='submit'>
                    Update Ad
                  </Button.Ripple>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      )}
    </Card>
  )
}

export default BlockedApps
