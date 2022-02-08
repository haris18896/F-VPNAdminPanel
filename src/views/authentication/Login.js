import { useSkin } from "@hooks/useSkin"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { Link, useHistory } from "react-router-dom"
import { isObjEmpty } from "@utils"
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  Input,
  FormGroup,
  Label,
  Button,
} from "reactstrap"
import { handleLogin } from "../../redux/actions/auth/loginActions"
import classnames from "classnames"
import InputPasswordToggle from "@components/input-password-toggle"
import Spinner from "../common/Spinner"
import "@styles/base/pages/page-auth.scss"

// ** Config
import themeConfig from "@configs/themeConfig"

const Login = () => {
  // SETUP
  const dispatch = useDispatch()
  const history = useHistory()

  // ** Redux
  const [skin, setSkin] = useSkin()
  const { loginInProgress, error } = useSelector((state) => state.auth)
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (formData) => {
    if (isObjEmpty(errors)) {
      const { email, password } = formData
      dispatch(handleLogin({ email, password }, history))
    }
  }

  return loginInProgress ? (
    <Spinner />
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
              {skin === "dark" ? (
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

              {/* <h2 className='brand-text text-primary ml-1'>Vuexy</h2> */}
            </Link>
            <CardTitle tag="h4" className="mb-2 text-center">
              Admin Login
            </CardTitle>
            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormGroup>
                <Label className="form-label" for="email">
                  Email
                </Label>
                <Input
                  autoFocus
                  type="email"
                  id="email"
                  name="email"
                  placeholder="admin@example.com"
                  className={classnames({ "is-invalid": errors["email"] })}
                  innerRef={register({ required: true })}
                />
              </FormGroup>
              <FormGroup className="mb-2">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="password">
                    Password
                  </Label>
                </div>
                <InputPasswordToggle
                  id="password"
                  name="password"
                  className="input-group-merge"
                  className={classnames({ "is-invalid": errors["password"] })}
                  innerRef={register({ required: true })}
                />
              </FormGroup>

              {error ? <p className="text-danger mb-1">{error.msg}</p> : ""}
              <Button.Ripple type="submit" color="primary" block>
                Sign in
              </Button.Ripple>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Login
