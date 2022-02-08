import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { useForm } from "react-hook-form"
import classnames from "classnames"
import InputPasswordToggle from "@components/input-password-toggle"

import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap"
import { isObjEmpty } from "@utils"
import "@styles/base/pages/page-auth.scss"
import {
  initiateRegistration,
  registrationFailed,
  registrationSuccess,
} from "../../../redux/actions/admin/register/registerAdminActions"
import useJwt from "@src/auth/jwt/useJwt"
import SpinnerComponent from "../../../@core/components/spinner/Fallback-spinner"
import { RESET_REGISTER_STATE } from "../../../redux/actions/actionType/admin/register"

// ** Config
import themeConfig from "@configs/themeConfig"
import { ArrowLeft } from "react-feather"

const Register = () => {
  // STATE FOR GRABBING DATA TO REGSITER A USER
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  }

  // STATE FOR GRABBING ERRORS FOR SHOWING VALIDATION ERRORS
  const initialErrorState = {
    nameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  }

  const [state, setState] = useState(initialState)
  const [errorState, setErrorState] = useState(initialErrorState)

  const { register, errors, handleSubmit } = useForm()

  // DISPATCH
  const dispatch = useDispatch()

  // HISTORY
  const history = useHistory()

  // ** Redux
  const { currentSkin } = useSelector((state) => state.skin)
  const { inProcess, errs } = useSelector((state) => state.register)

  const postData = async () => {
    const { name, email, password, confirmPassword } = state

    try {
      const response = await useJwt.registerAdmin({
        name,
        email,
        password,
        confirmPassword,
      })

      if (response.data) {
        dispatch(registrationSuccess(response.data))

        // REDIRECT TO /ADMINS
        history.push("/admins")
      }
    } catch (err) {
      if (err.response) {
        dispatch(registrationFailed(err.response.data.errors))
      }
    }
  }
  const onSubmit = (formData) => {
    if (isObjEmpty(errors)) {
      dispatch(initiateRegistration())
      postData()
    }
  }

  const onChangeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    setErrorState({
      nameError: "",
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
    })

    if (errs && errs.length) {
      const nameError = errs.find((err) => err.param === "name")
      const emailError = errs.find((err) => err.param === "email")
      const passwordError = errs.find((err) => err.param === "password")
      const confirmPasswordError = errs.find(
        (err) => err.param === "confirmPassword"
      )

      if (nameError) {
        setErrorState({ ...errorState, ["nameError"]: nameError.msg })
      }

      if (emailError) {
        setErrorState({ ...errorState, ["emailError"]: emailError.msg })
      }

      if (passwordError) {
        setErrorState({ ...errorState, ["passwordError"]: passwordError.msg })
      }
      if (confirmPasswordError) {
        setErrorState({
          ...errorState,
          ["confirmPasswordError"]: confirmPasswordError.msg,
        })
      }
    }
  }, [errs])

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_REGISTER_STATE })
    }
  }, [])

  return inProcess ? (
    <SpinnerComponent />
  ) : (
    <div className="auth-wrapper auth-v1 px-2">
      <div className="auth-inner py-2">
        <Card className="mb-0">
          <CardBody>
            <Link
              className="brand-logo"
              to="/"
              onClick={(e) => e.preventDefault()}
            >
              {currentSkin === '"dark"' || currentSkin === "dark" ? (
                <img
                  src={themeConfig.app.appLogoImageLight}
                  alt="logo-dark"
                  height="30px"
                />
              ) : (
                <img
                  src={themeConfig.app.appLogoImageDark}
                  alt="logo-dark"
                  height="30px"
                />
              )}
            </Link>

            <CardTitle tag="h4" className="mb-1 text-centers">
              Register a new admin
            </CardTitle>

            <Link to="/admins">
              <ArrowLeft size={30} />
            </Link>

            <Form
              className="auth-register-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormGroup>
                <Label className="form-label" for="name">
                  Name
                </Label>
                {errorState && errorState.nameError && state.name ? (
                  <span
                    style={{ fontSize: "10px" }}
                    className="text-danger ml-1"
                  >
                    {errorState.nameError}
                  </span>
                ) : (
                  ""
                )}

                <Input
                  onChange={onChangeHandler}
                  name="name"
                  type="text"
                  id="name"
                  className={classnames({ "is-invalid": errors["email"] })}
                  innerRef={register({
                    required: true,
                    validate: (value) => value !== "",
                  })}
                  placeholder="johndoe"
                  autoFocus
                  value={state.name}
                />
              </FormGroup>
              <FormGroup>
                <Label className="form-label" for="email">
                  Email
                </Label>
                {errorState && errorState.emailError && state.email ? (
                  <span
                    style={{ fontSize: "10px" }}
                    className="text-danger ml-1"
                  >
                    {errorState.emailError}
                  </span>
                ) : (
                  ""
                )}
                <Input
                  onChange={onChangeHandler}
                  name="email"
                  type="email"
                  id="email"
                  className={classnames({ "is-invalid": errors["email"] })}
                  innerRef={register({
                    required: true,
                    validate: (value) => value !== "",
                  })}
                  placeholder="john@example.com"
                  value={state.email}
                />
              </FormGroup>
              <FormGroup>
                <Label className="form-label" for="password">
                  Password
                </Label>
                {errorState && errorState.passwordError && state.password ? (
                  <span
                    style={{ fontSize: "10px" }}
                    className="text-danger ml-1"
                  >
                    {errorState.passwordError}
                  </span>
                ) : (
                  ""
                )}
                <InputPasswordToggle
                  onChange={onChangeHandler}
                  name="password"
                  className="input-group-merge"
                  id="password"
                  className={classnames({ "is-invalid": errors["password"] })}
                  innerRef={register({
                    required: true,
                    validate: (value) => value !== "",
                  })}
                  value={state.password}
                />
              </FormGroup>
              <FormGroup className="mb-2">
                <Label className="form-label" for="confirmPassword">
                  Confirm Password
                </Label>{" "}
                {errorState &&
                errorState.confirmPasswordError &&
                state.confirmPassword ? (
                  <span
                    style={{ fontSize: "10px" }}
                    className="text-danger ml-1"
                  >
                    {errorState.confirmPasswordError}
                  </span>
                ) : (
                  ""
                )}
                <InputPasswordToggle
                  onChange={onChangeHandler}
                  name="confirmPassword"
                  className="input-group-merge"
                  id="confirmPassword"
                  className={classnames({
                    "is-invalid": errors["confirmPassword"],
                  })}
                  innerRef={register({
                    required: true,
                    validate: (value) => value !== "",
                  })}
                  value={state.confirmPassword}
                />
              </FormGroup>
              <Button.Ripple type="submit" color="primary" block>
                Register Admin
              </Button.Ripple>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Register
