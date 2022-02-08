/* eslint-disable */
import { useState, useEffect } from 'react'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { isObjEmpty } from '@utils'
import { Card, CardBody, Form, Input, FormGroup, Label, Button, Row, Col, CardText } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import Menu from '../menu/Menu'
import { CLEAR_APP_SETTING_STATE } from '../../../../redux/actions/actionType/settings/clear'
import { handleFetchPaymentSettings } from '../../../../redux/actions/settings/app/fetch/payment'
import { handlePaymentUpdate } from '../../../../redux/actions/settings/app/update/payment'

const ComponentSpinner = () => {
  return (
    <div className='fallback-spinner' style={{ marginTop: '155px' }}>
      <div className='loading component-loader'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

const Payment = () => {
  const [stripePublishableKey, setStripePublishableKey] = useState('')

  const { register, errors, handleSubmit } = useForm()
  const dispatch = useDispatch()

  // EXTRACTING STUFF FROM REDUX
  const { inProcess, payment, status } = useSelector(state => state.setting)

  const onSubmit = data => {
    if (isObjEmpty(errors)) {
      dispatch(handlePaymentUpdate({ stripePublishableKey }))
    }
  }

  useEffect(() => {
    if (payment) {
      // setState(payment)
      setStripePublishableKey(payment.stripePublishableKey)
    }
  }, [payment])

  useEffect(() => {
    dispatch(handleFetchPaymentSettings())
  }, [])

  useEffect(() => {
    return () => {
      dispatch({ type: CLEAR_APP_SETTING_STATE })
    }
  }, [])
  return (
    <Card>
      <CardBody>
        <Menu currentActive='payment' />

        {inProcess ? (
          <ComponentSpinner />
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)} className='mt-2'>
            <Row>
              <Col sm='12' md={4} className='mb-3 mb-md-0'>
                <FormGroup className='mb-2'>
                  <Label className='form-label' for='keyId'>
                    Key ID
                  </Label>
                  <Input
                    type='text'
                    value={stripePublishableKey}
                    id='stripePublishableKey'
                    name='stripePublishableKey'
                    placeholder='123'
                    onChange={e => setStripePublishableKey(e.target.value)}
                    className={classnames({ 'is-invalid': errors['stripePublishableKey'] })}
                    innerRef={register({ required: true, validate: value => value !== '' })}
                  />
                </FormGroup>
                {status === 'SUCCESS' ? <p className='text-success'>Payment settings updated successfully!</p> : ''}
                <Button.Ripple className='mr-1' color='primary' type='submit'>
                  Update
                </Button.Ripple>
              </Col>
            </Row>
          </Form>
          // </CardBody>
        )}
      </CardBody>
    </Card>
  )
}

export default Payment
