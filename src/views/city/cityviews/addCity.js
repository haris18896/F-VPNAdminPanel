import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
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
import { handleFetchAllCountriesRecords } from "../../../redux/actions/country/fetch"
import { handleAddCity } from "../../../redux/actions/city/add"
import { RESET_CITY_STATE } from "../../../redux/actions/actionType/city/reset"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import classnames from "classnames"
import Spinner from "../../common/Spinner"
import Menu from "../menu/Menu"
import "@styles/base/pages/page-auth.scss"


const AddCity = () => {

  const schema = yup.object().shape({
    name: yup.string().required(),
    countryId: yup.string().required(),
    subCountry: yup.string().required(),
    isCapital: yup.boolean().required(),
    featureCode: yup.string().optional(),
    geonameId: yup.number().nullable().transform((value, originalValue) => (String(originalValue).trim() === "" ? 0 : value)),
    population: yup.number().min(1000).required(),
    location: yup.string().required()
  })

  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const { countries } = useSelector((state) => state.country)
  const { addCityInProcess, success, error } = useSelector((state) => state.city)

  // DISPATCH
  const dispatch = useDispatch()

  const onSubmit = (formData) => {
    if (isObjEmpty(errors)) {
      dispatch(handleAddCity(formData))
      reset(formData)
    }
  }

  useEffect(() => {
    dispatch(handleFetchAllCountriesRecords(500))
  }, [])

  useEffect(() => {
    if (success) reset({})
  }, [success])

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_CITY_STATE })
    }
  }, [])

  return (
    <Card>
      <CardBody>
        <Menu currentActive="addCity" />

        {addCityInProcess ? (
          <Spinner />
        ) : (
          <Form
            className="auth-register-form mt-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Row className="justify-content-center">

              <Col lg={6}>
                <FormGroup className="mb-2">
                  <Label className="form-label" for="name">
                    Name
                  </Label>

                  <Input
                    name="name"
                    type="text"
                    id="name"
                    className={classnames({ "is-invalid": errors["name"] })}
                    innerRef={register({ required: true })}
                    autoFocus
                    placeholder="Karachi"
                  />
                </FormGroup>

                <FormGroup className="mb-2">
                  <Label for="countryId" className="mr-1">
                    Country
                  </Label>

                  <Input
                    name="countryId"
                    type="select"
                    id="countryId"
                    className={classnames({
                      "is-invalid": errors["countryId"],
                    })}
                    innerRef={register({ required: true })}
                  >
                    <option value="">Choose...</option>
                    {countries &&
                      countries.map((country) => (
                        <option key={country._id} value={country._id}>
                          {country.name}
                        </option>
                      ))}
                  </Input>
                </FormGroup>

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
                  />
                </FormGroup>

                <FormGroup className="mb-2">
                  <Label className="form-label" for="isCapital">
                    Capital?
                  </Label>

                  <Input
                    name="isCapital"
                    type="select"
                    id="isCapital"
                    className={classnames({
                      "is-invalid": errors["isCapital"],
                    })}
                    innerRef={register({ required: true })}
                  >
                    <option value="">Choose...</option>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                  </Input>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup className="mb-2">
                  <Label className="form-label" for="featureCode">
                    Feature Code
                    <span className="text-primary">&nbsp;(Optional)</span>
                  </Label>

                  <Input
                    name="featureCode"
                    type="text"
                    id="featureCode"
                    placeholder="KA"
                    className={classnames({
                      "is-invalid": errors["featureCode"],
                    })}
                    innerRef={register({ required: false })}
                  />
                </FormGroup>

                <FormGroup className="mb-2">
                  <Label className="form-label" for="geonameId">
                    Geo Name ID
                    <span className="text-primary">&nbsp;(Optional)</span>
                  </Label>

                  <Input
                    name="geonameId"
                    type="number"
                    id="geonameId"
                    placeholder="123456"
                    className={classnames({
                      "is-invalid": errors["geonameId"],
                    })}
                    innerRef={register({ required: false })}
                  />
                </FormGroup>

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

                <FormGroup className="mb-2">
                  <Label className="form-label" for="location">
                    Location
                  </Label>

                  <Input
                    name="location"
                    type="string"
                    id="location"
                    placeholder="longitude, latitude. e.g 75, 40"
                    className={classnames({ "is-invalid": errors["location"] })}
                    innerRef={register({ required: true })}
                  />
                </FormGroup>
              </Col>
            </Row>
            {success && (
              <p className="text-success">
                City has been successfully added!
              </p>
            )}

            {error && (
              <p className="text-danger">
                {error.errors && error.errors.length ? `${error.errors[0].param}: ${error.errors[0].msg}` : error.msg}
              </p>
            )}
            <Button.Ripple className="mt-2" type="submit" color="primary">
              Add City
            </Button.Ripple>
          </Form>
        )}
      </CardBody>
    </Card>
  )
}

export default AddCity
