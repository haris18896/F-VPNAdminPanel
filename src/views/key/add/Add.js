/* eslint-disable */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardBody, CardHeader, CardText, CardTitle, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { isObjEmpty } from '@utils'

// import { Card, CardBody, CardTitle, Form, Input, FormGroup, Label, Button, Row, Col, CardText } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import { handleAddSSHKey } from '../../../redux/actions/key/add'
import { RESET_SHH_KEY_STATE } from '../../../redux/actions/actionType/key/add'

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

const AddSSHKeys = () => {
  const initialState = {
    keyId: '',
    type: 'ed25519',
    privateKey: '',
    publicKey: '',
  }

  // STATE FOR GRABBING ERRORS FOR SHOWING VALIDATION ERRORS
  const initialErrorState = {
    keyIdError: '',
    typeError: '',
    privateKeyError: '',
    publicKeyError: '',
  }

  const [state, setState] = useState(initialState)
  const [errorState, setErrorState] = useState(initialErrorState)

  const { register, errors, handleSubmit } = useForm()

  const dispatch = useDispatch()
  const { inProcess, errs, status } = useSelector(state => state.key)

  const onSubmit = data => {
    if (isObjEmpty(errors)) {
      const data = {
        keyId: state.keyId,
        privateKey: state.privateKey,
        type: state.type,
      }

      if (state.publicKey) {
        data.publicKey = state.publicKey
      }

      dispatch(handleAddSSHKey(data))
    }
  }

  const onChangeHandler = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    setErrorState({ keyIdError: '', typeError: '', privateKeyError: '', confirmPasswordError: '' })

    if (errs && errs.length) {
      const keyIdError = errs.find(err => err.param === 'keyId' || err.param === '_id')
      const typeError = errs.find(err => err.param === 'type')
      const privateKeyError = errs.find(err => err.param === 'privateKey')
      const publicKeyError = errs.find(err => err.param === 'publicKey')

      if (keyIdError) {
        setErrorState({ ...errorState, ['keyIdError']: keyIdError.msg })
      }

      if (typeError) {
        setErrorState({ ...errorState, ['typeError']: typeError.msg })
      }

      if (privateKeyError) {
        setErrorState({ ...errorState, ['privateKeyError']: privateKeyError.msg })
      }
      if (publicKeyError) {
        setErrorState({ ...errorState, ['publicKeyError']: publicKeyError.msg })
      }
    }
  }, [errs])

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_SHH_KEY_STATE })
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add SSH Keys</CardTitle>
      </CardHeader>

      {inProcess ? (
        <ComponentSpinner />
      ) : (
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm={12} md={8} lg={6} className='mb-3 mb-md-0'>
                <FormGroup className='mb-2'>
                  <Label className='form-label' for='keyId'>
                    Key ID
                  </Label>

                  {errorState && errorState.keyIdError ? (
                    <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                      {errorState.keyIdError}
                    </span>
                  ) : (
                    ''
                  )}

                  <Input
                    type='select'
                    name='keyId'
                    onChange={onChangeHandler}
                    value={state.keyId}
                    onChange={onChangeHandler}
                    className={classnames({ 'is-invalid': errors['keyId'] })}
                    innerRef={register({ required: true, validate: value => value !== '' })}
                  >
                    <option value=''>Choose...</option>
                    <option value='controller'>Controller</option>
                    <option value='ca'>Certificate Authority</option>
                    <option value='vpn-server'>VPN Server</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='type'>
                    Type
                  </Label>
                  <Input readOnly type='text' id='type' name='type' value={state.type} />
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='privateKey'>
                    Private Key
                  </Label>
                  <Input
                    value={state.privateKey}
                    type='textarea'
                    id='privateKey'
                    name='privateKey'
                    onChange={onChangeHandler}
                    className={classnames({ 'is-invalid': errors['privateKey'] })}
                    innerRef={register({ required: true, validate: value => value !== '' })}
                    rows={10}
                  />
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='publicKey'>
                    Public Key <span className='text-primary'>(optional)</span>
                  </Label>
                  <Input
                    value={state.publicKey}
                    type='textarea'
                    id='publicKey'
                    name='publicKey'
                    onChange={onChangeHandler}
                    rows={10}
                  />
                </FormGroup>
                {status === 'SUCCESS' ? <p className='text-success'>SSH key has been added successfully!</p> : ''}
                <Button.Ripple className='mr-1' color='primary' type='submit'>
                  Add
                </Button.Ripple>
              </Col>
              {/* <Col sm='12'>
                <FormGroup className='d-flex mb-0'>
                </FormGroup>
              </Col> */}
            </Row>
          </Form>
        </CardBody>
      )}
    </Card>
  )
}

export default AddSSHKeys
