import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
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
import { handleFetchProfile } from "../../../redux/actions/admin/fetch.profile/fetchProfileActions"
import {
  handleUpdateProfile,
  resetState,
} from "../../../redux/actions/admin/profile.update/profileUpdateActions"
import { ArrowLeft } from "react-feather"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import classnames from "classnames"
import themeConfig from "@configs/themeConfig"
import Spinner from "../../common/Spinner"
import "@styles/base/pages/page-auth.scss"

const UpdateProfile = () => {
  const dispatch = useDispatch()

  const { currentSkin } = useSelector((state) => state.skin)

  const { inProcess, profile, profileUpdationInProcess, success, error } =
    useSelector((state) => state.profileUpdate)

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
  })

  const { register, errors, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (formData) => {
    if (isObjEmpty(errors)) {
      dispatch(handleUpdateProfile(formData))
      reset(formData)
    }
  }

  useEffect(() => {
    dispatch(handleFetchProfile())
  }, [dispatch])

  useEffect(() => {
    if (profile) {
      const { name, email } = profile
      reset({ name, email })
    }
  }, [profile])

  useEffect(() => {
    return () => {
      dispatch(resetState())
    }
  }, [])

  return inProcess || profileUpdationInProcess ? (
    <Spinner/>
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
              Update Your Profile
            </CardTitle>

            <Link to="/">
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

                <Input
                  name="name"
                  type="text"
                  id="name"
                  className={classnames({ "is-invalid": errors["name"] })}
                  innerRef={register({ required: true })}
                  placeholder="John Snowden"
                  autoFocus
                />
              </FormGroup>
              <FormGroup>
                <Label className="form-label" for="email">
                  Email
                </Label>
                <Input
                  name="email"
                  type="email"
                  id="email"
                  className={classnames({ "is-invalid": errors["email"] })}
                  innerRef={register({ required: true })}
                  placeholder="john@example.com"
                />
              </FormGroup>
              {success && (
                <p className="text-success">
                  Profile has been successfully updated!
                </p>
              )}
              {error && (
                <p className="text-danger">
                  {error.errors?.length ? error.errors[0].msg : error.msg}
                </p>
              )}
              <Button.Ripple type="submit" color="primary" block>
                Update Profile
              </Button.Ripple>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default UpdateProfile
