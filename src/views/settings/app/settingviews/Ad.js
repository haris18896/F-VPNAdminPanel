/* eslint-disable */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Card, CardBody, CardTitle, Form, Input, FormGroup, Label, Button, Row, Col, CardText } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import Menu from '../menu/Menu'
import { handleAdUpdate } from '../../../../redux/actions/settings/app/update/ad'
import { handleFetchAdSettings } from '../../../../redux/actions/settings/app/fetch/ad'
import { CLEAR_APP_SETTING_STATE } from '../../../../redux/actions/actionType/settings/clear'

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

const Ad = () => {
  const initialFacebookState = {
    'facebook.isActive': undefined,
    'facebook.bannerId': '',
    'facebook.interstitialId': '',
    'facebook.mediumRectangleId': '',
    'facebook.nativeId': '',
  }

  const initialAdMobState = {
    'adMob.isActive': undefined,
    'adMob.bannerId': '',
    'adMob.interstitialId': '',
    'adMob.nativeId': '',
  }

  const [facebookState, setFacebookState] = useState(initialFacebookState)
  const [adMobState, setAdMobState] = useState(initialAdMobState)

  const { handleSubmit } = useForm()
  const dispatch = useDispatch()

  // EXTRACTING STUFF FROM REDUX
  const { inProcess, ad, status } = useSelector(state => state.setting)

  const onChangeFacebookState = e => {
    setFacebookState({ ...facebookState, [e.target.name]: e.target.value })
  }

  const onChangeAdMobState = e => {
    setAdMobState({ ...adMobState, [e.target.name]: e.target.value })
  }

  const onSubmit = formData => {
    const facebook = {
      isActive: facebookState['facebook.isActive'],
      bannerId: facebookState['facebook.bannerId'].trim(),
      interstitialId: facebookState['facebook.interstitialId'].trim(),
      mediumRectangleId: facebookState['facebook.mediumRectangleId'].trim(),
      nativeId: facebookState['facebook.nativeId'].trim(),
    }

    const adMob = {
      isActive: adMobState['adMob.isActive'],
      bannerId: adMobState['adMob.bannerId'].trim(),
      interstitialId: adMobState['adMob.interstitialId'].trim(),
      nativeId: adMobState['adMob.nativeId'].trim(),
    }

    const data = {
      facebook,
      adMob,
    }

    dispatch(handleAdUpdate(data))
  }

  useEffect(() => {
    if (ad) {
      setFacebookState({
        'facebook.isActive': ad.facebook.isActive,
        'facebook.bannerId': ad.facebook.bannerId,
        'facebook.interstitialId': ad.facebook.interstitialId,
        'facebook.mediumRectangleId': ad.facebook.mediumRectangleId,
        'facebook.nativeId': ad.facebook.nativeId,
      })

      setAdMobState({
        'adMob.isActive': ad.adMob.isActive,
        'adMob.bannerId': ad.adMob.bannerId,
        'adMob.interstitialId': ad.adMob.interstitialId,
        'adMob.nativeId': ad.adMob.nativeId,
      })
    }
  }, [ad])

  useEffect(() => {
    dispatch(handleFetchAdSettings())
  }, [])

  useEffect(() => {
    return () => {
      dispatch({ type: CLEAR_APP_SETTING_STATE })
    }
  }, [])
  return (
    <Card>
      <CardBody>
        <Menu currentActive='ad' />

        {inProcess ? (
          <ComponentSpinner />
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)} className='mt-2'>
            <Row>
              <Col md='6' sm='12' className='mb-3 mb-md-0'>
                <FormGroup>
                  <CardTitle className='text-primary'>Facebook</CardTitle>
                  <Label className='form-label' for='facebook.isActive'>
                    Active
                  </Label>
                  <Input
                    // required={true}

                    type='select'
                    value={facebookState.isActive}
                    id='facebook.isActive'
                    name='facebook.isActive'
                    onChange={onChangeFacebookState}
                  >
                    <option>true</option>
                    <option>false</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label className='form-label' for='facebook.bannerId'>
                    Banner ID
                  </Label>
                  <Input
                    type='text'
                    value={facebookState['facebook.bannerId']}
                    id='facebook.bannerId'
                    name='facebook.bannerId'
                    placeholder='123'
                    onChange={onChangeFacebookState}
                    // className={classnames({ 'is-invalid': facebookState['facebook.bannerId'] === '' })}
                    // // innerRef={register({ required: true, validate: value => value !== '' })}
                  />
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='facebook.interstitialId'>
                    Interstitial ID
                  </Label>
                  <Input
                    type='text'
                    value={facebookState['facebook.interstitialId']}
                    id='facebook.interstitialId'
                    name='facebook.interstitialId'
                    placeholder='123'
                    onChange={onChangeFacebookState}
                    // className={classnames({ 'is-invalid': facebookState['facebook.interstitialId'] === '' })}
                    // // innerRef={register({ required: true, validate: value => value !== '' })}
                  />
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='facebook.mediumRectangleId'>
                    Medium Rectangle ID
                  </Label>
                  <Input
                    type='text'
                    value={facebookState['facebook.mediumRectangleId']}
                    id='facebook.mediumRectangleId'
                    name='facebook.mediumRectangleId'
                    placeholder='123'
                    onChange={onChangeFacebookState}
                    // className={classnames({ 'is-invalid': facebookState['facebook.mediumRectangleId'] === '' })}
                    // innerRef={register({ required: true, validate: value => value !== '' })}
                  />
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='facebook.nativeId'>
                    Native ID
                  </Label>
                  <Input
                    type='text'
                    value={facebookState['facebook.nativeId']}
                    id='facebook.nativeId'
                    name='facebook.nativeId'
                    placeholder='123'
                    onChange={onChangeFacebookState}
                    // className={classnames({ 'is-invalid': facebookState['facebook.nativeId'] === '' })}
                    // innerRef={register({ required: true, validate: value => value !== '' })}
                  />
                </FormGroup>
              </Col>

              <Col md='6' sm='12'>
                <FormGroup>
                  <CardTitle className='text-primary'>Ad Mob</CardTitle>
                  <Label className='form-label' for='adMob.isActive'>
                    Active
                  </Label>
                  <Input
                    type='select'
                    value={adMobState['adMob.isActive']}
                    id='adMob.isActive'
                    name='adMob.isActive'
                    onChange={onChangeAdMobState}
                  >
                    <option>true</option>
                    <option>false</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='adMob.bannerId'>
                    Banner ID
                  </Label>
                  <Input
                    type='text'
                    value={adMobState['adMob.bannerId']}
                    id='adMob.bannerId'
                    name='adMob.bannerId'
                    placeholder='123'
                    onChange={onChangeAdMobState}
                    // className={classnames({ 'is-invalid': adMobState['adMob.bannerId'] === '' })}
                    // innerRef={register({ required: true, validate: value => value !== '' })}
                  />
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='adMob.interstitialId'>
                    Interstitial ID
                  </Label>
                  <Input
                    type='text'
                    value={adMobState['adMob.interstitialId']}
                    id='adMob.interstitialId'
                    name='adMob.interstitialId'
                    placeholder='123'
                    onChange={onChangeAdMobState}
                    // className={classnames({ 'is-invalid': adMobState['adMob.interstitialId'] === '' })}
                    // innerRef={register({ required: true, validate: value => value !== '' })}
                  />
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='adMob.nativeId'>
                    Native ID
                  </Label>
                  <Input
                    autoFocus
                    type='text'
                    value={adMobState['adMob.nativeId']}
                    id='adMob.nativeId'
                    name='adMob.nativeId'
                    placeholder='123'
                    onChange={onChangeAdMobState}
                    // className={classnames({ 'is-invalid': adMobState['adMob.nativeId'] === '' })}
                    // innerRef={register({ required: true, validate: value => value !== '' })}
                  />
                </FormGroup>
              </Col>
              <Col sm='12'>
                {status === 'SUCCESS' ? <p className='text-success'>Ad updated successfully!</p> : ''}
                <FormGroup className='d-flex mb-0'>
                  <Button.Ripple className='mr-1' color='primary' type='submit'>
                    Update Ad
                  </Button.Ripple>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        )}
      </CardBody>
    </Card>
  )
}

export default Ad
