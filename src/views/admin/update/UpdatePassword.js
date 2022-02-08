import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
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
import { handleUpdatePassword, resetState } from "../../../redux/actions/admin/password.update/passwordUpdateActions"
import { ArrowLeft } from "react-feather"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Spinner from "../../common/Spinner"
import themeConfig from "@configs/themeConfig"
import "@styles/base/pages/page-auth.scss"

const UpdatePassword = () => {

  const schema = yup.object().shape({
    currentPassword: yup.string().required(),
    newPassword: yup.string().required(),
    confirmNewPassword: yup.string().required(),
  })

  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const dispatch = useDispatch()

  const { currentSkin } = useSelector((state) => state.skin)

  const { passwordUpdationInProcess, success, error } = useSelector(state => state.passwordUpdate)

  const onSubmit = (formData) => {
    if (isObjEmpty(errors)) {
      dispatch(handleUpdatePassword(formData))
      reset(formData)
    }
  }

  useEffect(() => {
    if (success) reset({})
  }, [success])

  useEffect(() => {
    return () => {
      dispatch(resetState())
    }
  }, [])

  return passwordUpdationInProcess ? (
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
              Update Password
            </CardTitle>

            <Link to="/">
              <ArrowLeft size={30} />
            </Link>

            <Form
              className="auth-register-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormGroup>
                <Label className="form-label" for="currentPassword">
                  Current Password
                </Label>

                <Input
                  name="currentPassword"
                  type="password"
                  id="currentPassword"
                  className={classnames({
                    "is-invalid": errors["currentPassword"],
                  })}
                  innerRef={register({
                    required: true,
                  })}
                  autoFocus
                />
              </FormGroup>
              <FormGroup>
                <Label className="form-label" for="newPassword">
                  New Password
                </Label>

                <Input
                  name="newPassword"
                  type="password"
                  id="newPassword"
                  className={classnames({
                    "is-invalid": errors["newPassword"],
                  })}
                  innerRef={register({
                    required: true
                  })}
                />
              </FormGroup>
              <FormGroup>
                <Label className="form-label" for="confirmNewPassword">
                  Confirm New Password
                </Label>
                
                <Input
                  name="confirmNewPassword"
                  type="password"
                  id="confirmNewPassword"
                  className={classnames({
                    "is-invalid": errors["confirmNewPassword"],
                  })}
                  innerRef={register({
                    required: true
                  })}
                />
              </FormGroup>

              {success && (<p className='text-success'>Password has been successfully updated!</p>)}
              {error && (<p className='text-danger'>{error.errors?.length ? error.errors[0].msg : error.msg}</p>)}

              <Button.Ripple type="submit" color="primary" block>
                Update Password
              </Button.Ripple>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default UpdatePassword
