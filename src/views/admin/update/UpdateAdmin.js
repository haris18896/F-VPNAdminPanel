import { useState, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import classnames from "classnames"
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
import SpinnerComponent from "../../../@core/components/spinner/Fallback-spinner"
import {
  fetchAdminInitiated,
  handleFetchAdmin,
} from "../../../redux/actions/admin/fetch.admin/fetchAdminActions"
import {
  handleUpdateAdmin,
  updateAdminInitiated,
} from "../../../redux/actions/admin/update.admin/updateAdminActions"
import { ArrowLeft } from "react-feather"

// ** Config
import themeConfig from "@configs/themeConfig"

const UpdateAdmin = () => {
  // STATE FOR GRABBING DATA TO REGSITER A USER
  const initialState = {
    name: "",
    email: "",
  }

  // STATE FOR GRABBING ERRORS FOR SHOWING VALIDATION ERRORS
  const initialErrorState = {
    nameError: "",
    emailError: "",
  }

  const [state, setState] = useState(initialState)
  const [errorState, setErrorState] = useState(initialErrorState)
  const { register, errors, handleSubmit } = useForm()

  // DISPATCH
  const dispatch = useDispatch()

  // EXTRACTING STUFF
  const { name, email } = state

  // ** Redux
  const { currentSkin } = useSelector((state) => state.skin)
  const {
    inProcess,
    isAdminFetched,
    adminUpdationInProcess,
    profile,
    isAdminUpdated,
    errs,
  } = useSelector((state) => state.adminUpdate)

  // EXTRACTING ID FROM THE PARAMS
  const { id } = useParams()

  const onSubmit = (formData) => {
    if (isObjEmpty(errors)) {
      dispatch(updateAdminInitiated())
      dispatch(handleUpdateAdmin(id, state))
    }
  }

  const onChangeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const fetchAdmin = useCallback(async () => {
    dispatch(fetchAdminInitiated())
    dispatch(handleFetchAdmin(id))
  }, [dispatch])

  useEffect(() => {
    fetchAdmin()
  }, [fetchAdmin, id])

  useEffect(() => {
    if (isAdminFetched) {
      const { name, email } = profile
      setState({ name, email })
    }
  }, [profile])

  useEffect(() => {
    setErrorState({ nameError: "", emailError: "" })

    if (errs && errs.length) {
      const nameError = errs.find((err) => err.param === "name")
      const emailError = errs.find((err) => err.param === "email")

      if (nameError) {
        setErrorState({ ...errorState, ["nameError"]: nameError.msg })
      }

      if (emailError) {
        setErrorState({ ...errorState, ["emailError"]: emailError.msg })
      }
    }
  }, [errs])

  return (inProcess && !isAdminFetched) || adminUpdationInProcess ? (
    <SpinnerComponent msg="Fetching Profile" />
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
            <CardTitle tag="h4" className="mb-1 text-center">
              Update admin profile
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
                  value={name}
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
                    {errorState.emailError} for the email field
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
                  value={email}
                />
              </FormGroup>
              {isAdminUpdated ? (
                <p className="text-success">Admin was updated successfully!</p>
              ) : (
                ""
              )}
              <Button.Ripple type="submit" color="primary" block>
                Update Admin
              </Button.Ripple>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default UpdateAdmin
