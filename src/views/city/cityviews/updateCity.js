import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
} from "reactstrap"
import { isObjEmpty } from "@utils"
import { handleCityFetch } from "../../../redux/actions/city/fetch"
import { handleUpdateCity } from "../../../redux/actions/city/update"
import { RESET_CITY_STATE } from "../../../redux/actions/actionType/city/reset"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import classnames from "classnames"
import Spinner from "../../common/Spinner"
import Menu from "../menu/Menu"
import "@styles/base/pages/page-auth.scss"

const AddCity = () => {
  
  const schema = yup.object().shape({
    subCountry: yup.string().required(),
    population: yup.number().min(1000).required()
  })

  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const { fetchCityInProcess, city, updateCityInProcess, success, error } = useSelector((state) => state.city)

  const dispatch = useDispatch()

  const { id } = useParams()

  const onSubmit = (formData) => {
    if (isObjEmpty(errors)) {
      dispatch(handleUpdateCity(formData, id))
      reset(formData)
    }
  }

  useEffect(() => {
    if (city) {
      const { subCountry, population } = city
      reset({ subCountry, population })
    }
  }, [city])

  useEffect(() => {
    if (id) {
      dispatch(handleCityFetch(id))
    }
  }, [id])

  // ** ON UNMOUNT CLEAR PLAN STATE
  useEffect(() => {
    return () => {
      dispatch({ type: RESET_CITY_STATE })
    }
  }, [])

  return (
    <Card>
      <CardBody>
        <Menu currentActive="updateCity" />

        {(fetchCityInProcess || updateCityInProcess) ? (
          <Spinner />
        ) : (
          <Form
            className="auth-register-form mt-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Row className="justify-content-center">

              <Col lg={6}>
                <FormGroup className="mb-2">
                  <Label className="form-label" for="subCountry">
                    Sub Country
                  </Label>

                  <Input
                    name="subCountry"
                    type="text"
                    id="subCountry"
                    className={classnames({
                      "is-invalid": errors["subCountry"],
                    })}
                    innerRef={register({ required: true })}
                    placeholder="Punjab"
                    autoFocus
                  />
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup className="mb-2">
                  <Label className="form-label" for="population">
                    Population
                  </Label>

                  <Input
                    name="population"
                    type="number"
                    id="population"
                    placeholder="100000"
                    min={1000}
                    className={classnames({
                      "is-invalid": errors["population"],
                    })}
                    innerRef={register({ required: true })}
                  />
                </FormGroup>
              </Col>
            </Row>
            {success && (
              <p className="text-success">
                City has been successfully updated!
              </p>
            )}

            {error && (
              <p className="text-danger">
                {error.errors && error.errors.length ? `${error.errors[0].param}: ${error.errors[0].msg}` : error.msg}
              </p>
            )}
            <Button.Ripple className="mt-2" type="submit" color="primary">
              Update City
            </Button.Ripple>
          </Form>
        )}
      </CardBody>
    </Card>
  )
}

export default AddCity
