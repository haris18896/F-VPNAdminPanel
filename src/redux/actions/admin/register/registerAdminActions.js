import { INITIATE_REGISTRATION, REGISTRATION_FAILED, REGISTRATION_SUCCESS } from '../../actionType/admin/register'

export const initiateRegistration = () => {
  return dispatch => dispatch({ type: INITIATE_REGISTRATION })
}

export const registrationSuccess = data => {
  return dispatch => dispatch({ type: REGISTRATION_SUCCESS, payload: data })
}

export const registrationFailed = data => {
  return dispatch => dispatch({ type: REGISTRATION_FAILED, payload: data })
}
