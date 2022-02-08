/* eslint-disable */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledTooltip,
} from 'reactstrap'
import { useForm } from 'react-hook-form'
import { isObjEmpty } from '@utils'
import { handleFetchCloudProviders } from '../../../redux/actions/server/fetch/cloudProviders'
import { handleFetchContinentsWithCloudId } from '../../../redux/actions/server/fetch/continents'
import { handleFetchCountriesByContinent } from '../../../redux/actions/server/fetch/countries'
import { handleFetchCitiesByCountry } from '../../../redux/actions/server/fetch/cities'
import { handleFetchRegionsByCity } from '../../../redux/actions/server/fetch/regions'
import { handleFetchInstancesByRegion } from '../../../redux/actions/server/fetch/instances'
import { handleFetchImages } from '../../../redux/actions/server/fetch/images'
import { handleFetchDNSProviders } from '../../../redux/actions/server/fetch/providers'
import { handleAddServer } from '../../../redux/actions/server/add'
import { RESET_SERVERS_LIST_STATE } from '../../../redux/actions/actionType/server/fetch/servers'
import { handleFetchInstanceSummaryDetails } from '../../../redux/actions/server/fetch/instanceSummary'
import { Info } from 'react-feather'
import { selectThemeColors } from '@utils'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Select from 'react-select'
import classnames from "classnames"
import Spinner from "../../common/Spinner"
import "@styles/base/pages/page-auth.scss"

const protocolOptions = [
  { value: 'openvpn', label: 'OpenVPN (TCP/UDP)' },
  { value: 'wireguard', label: 'Wireguard' },
]

const AddServer = () => {

  const schema = yup.object().shape({
    cloudId: yup.string().required(),
    continent: yup.string().required(),
    countryId: yup.string().required(),
    cityId: yup.string().required(),
    regionId: yup.string().required(),
    instanceType: yup.string().required().oneOf(['shared', 'dedicated']),
    instanceId: yup.string().required(),
    imageId: yup.string().required(),
    type: yup.string().required().oneOf(['ca', 'vpn']),
    accessType: yup.string().when("type", {
      is: "vpn",
      then: yup.string().oneOf(['free', 'premium']),
    }),
    dnsProviderId: yup.string().when("type", {
      is: "vpn",
      then: yup.string().required(),
    })
  })

  const { register, watch, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const cloudId = watch("cloudId")
  const continent = watch("continent")
  const countryId = watch("countryId")
  const cityId = watch("cityId")
  const regionId = watch("regionId")
  const instanceType = watch("instanceType")
  const instanceId = watch("instanceId")
  const type = watch("type")

  const [protocols, setProtocols] = useState([])

  const [showModalButton, setShowModalButton] = useState(false)
  const [modal, setModal] = useState(false)

  const dispatch = useDispatch()

  const {
    cloudProvidersFetchInProcess,
    providers,
    continentsFetchInProcess,
    continents,
    countriesFetchInProcess,
    countries,
    citiesFetchInProcess,
    cities,
    regionsFetchInProcess,
    regions,
    instancesFetchInProcess,
    instances,
    imagesFetchInProcess,
    images,
    dnsFetchInProcess,
    dnsProviders,
    addServerInProcess,
    success,
    error,
    instancesSummaryFetchInProcess,
    instance,
  } = useSelector(state => state.server)

  const onSubmit = formData => {
    if (isObjEmpty(errors)) {
      if (type === 'vpn' && !protocols.length) {
        alert('Protocol must be set')
        return
      }
      dispatch(handleAddServer({ ...formData, protocols }))
      reset(formData)
    }
  }

  // ** ON MOUNT FETCH CLOUD PROVIDERS
  useEffect(() => {
    dispatch(handleFetchCloudProviders())
  }, [])

  // ** IF CLOUD ID SELECTED FETCH CONTINENTS
  useEffect(() => {
    if (cloudId) {
      dispatch(handleFetchContinentsWithCloudId(cloudId))
    }
  }, [cloudId])

  // ** IF CONTINENT SELECTED FETCH COUNTRIES
  useEffect(() => {
    if (cloudId && continent) {
      dispatch(handleFetchCountriesByContinent(cloudId, continent))
    }
  }, [cloudId, continent])

  // ** IF COUNTRY SELECTED FETCH CITIES
  useEffect(() => {
    if (cloudId && countryId) {
      dispatch(handleFetchCitiesByCountry(cloudId, countryId))
    }
  }, [cloudId, countryId])

  // ** IF CITY SELECTED FETCH REGIONS
  useEffect(() => {
    if (cloudId && cityId) {
      dispatch(handleFetchRegionsByCity(cloudId, cityId))
    }
  }, [cloudId, cityId])

  // ** IF REGION SELECTED FETCH INSTANCES
  useEffect(() => {
    if (cloudId && regionId && instanceType) {
      dispatch(handleFetchInstancesByRegion(cloudId, regionId, instanceType))
    }
  }, [cloudId, regionId, instanceType])

  // ** FETCH IMAGES IF CLOUD ID AND REGION SELECTED
  useEffect(() => {
    if (cloudId && regionId) {
      dispatch(handleFetchImages(cloudId, regionId))
    }
  }, [cloudId, regionId])

  useEffect(() => {
    if (type === 'vpn') {
      dispatch(handleFetchDNSProviders())
    }
  }, [type])

  useEffect(() => {
    if (cloudId && regionId && instanceType && instanceId) {
      setShowModalButton(true)
      dispatch(handleFetchInstanceSummaryDetails(cloudId, regionId, instanceType, instanceId))
    } else {
      setShowModalButton(false)
    }
  }, [cloudId, regionId, instanceType, instanceId])

  const handleProtocolsChange = (selectedProtocols) => {
    let protocolsList = []
    selectedProtocols.forEach(protocol => {
      protocolsList.push(protocol.value)
    })
    setProtocols(protocolsList)
  };

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_SERVERS_LIST_STATE })
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Server</CardTitle>
      </CardHeader>

      {addServerInProcess ? (
        <Spinner />
      ) : (
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md='6' sm='12'>
                <FormGroup className='mb-2'>
                  <Label className='form-label' for='cloudId'>
                    Cloud Provider
                  </Label>

                  <Input
                    type='select'
                    id='cloudId'
                    name='cloudId'
                    className={classnames({ 'is-invalid': errors['cloudId'] })}
                    innerRef={register({ required: true })}
                  >
                    <option value=''>Choose</option>

                    {cloudProvidersFetchInProcess ? (
                      <option value=''>Loading...</option>
                    ) : (
                      providers &&
                      providers.map(provider => (
                        <option key={provider.id} value={provider.id}>
                          {provider.name}
                        </option>
                      ))
                    )}
                  </Input>
                </FormGroup>
              </Col>
              <Col md='6' sm='12'>
                <FormGroup className='mb-2'>
                  <Label className='form-label' for='continent'>
                    Continent
                  </Label>

                  <Input
                    type='select'
                    id='continent'
                    name='continent'
                    className={classnames({ 'is-invalid': errors['continent'] })}
                    innerRef={register({ required: true })}
                  >
                    <option value=''>Choose</option>

                    {continentsFetchInProcess ? (
                      <option value=''>Loading...</option>
                    ) : continents && continents.length ? (
                      continents.map(continent => (
                        <option key={continent} value={continent}>
                          {continent}
                        </option>
                      ))
                    ) : (
                      <option value=''>Choose Cloud Provider First</option>
                    )}
                  </Input>
                </FormGroup>
              </Col>
              <Col md='6' sm='12'>
                <FormGroup className='mb-2'>
                  <Label className='form-label' for='countryId'>
                    Country
                  </Label>

                  <Input
                    type='select'
                    id= 'countryId'
                    name='countryId'
                    className={classnames({ 'is-invalid': errors['countryId'] })}
                    innerRef={register({ required: true })}
                  >
                    <option value=''>Choose</option>

                    {countriesFetchInProcess ? (
                      <option value=''>Loading...</option>
                    ) : countries && countries.length ? (
                      countries.map(country => (
                        <option key={country._id} value={country._id}>
                          {country.name}
                        </option>
                      ))
                    ) : (
                      <option value=''>Choose Continent First</option>
                    )}
                  </Input>
                </FormGroup>
              </Col>
              <Col md='6' sm='12'>
                <FormGroup className='mb-2'>
                  <Label className='form-label' for='cityId'>
                    City
                  </Label>

                  <Input
                    type='select'
                    id='cityId'
                    name='cityId'
                    className={classnames({ 'is-invalid': errors['cityId'] })}
                    innerRef={register({ required: true })}
                  >
                    <option value=''>Choose</option>

                    {
                      citiesFetchInProcess ? (
                        <option value=''>Loading...</option>
                      ) : cities && cities.length ? (
                        cities.map(city => (
                          <option key={city._id} value={city._id}>
                            {city.name}
                          </option>
                        ))
                      ) : (
                        <option value=''>Choose Country First</option>
                      )
                    }
                  </Input>
                </FormGroup>
              </Col>
              <Col md='6' sm='12'>
                <FormGroup className='mb-2'>
                  <Label className='form-label' for='regionId'>
                    Region
                  </Label>

                  <Input
                    type='select'
                    id='regionId'
                    name='regionId'
                    className={classnames({ 'is-invalid': errors['regionId'] })}
                    innerRef={register({ required: true })}
                  >
                    <option value=''>Choose</option>

                    {regionsFetchInProcess ? (
                      <option value=''>Loading...</option>
                    ) : regions && regions.length ? (
                      regions.map(region => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))
                    ) : (
                      <option value=''>Choose City First</option>
                    )}
                  </Input>
                </FormGroup>
              </Col>

              <Col sm={12} md={6}>
                <FormGroup className='mb-2'>
                  <Label className='form-label' for='instanceType'>
                    Instance Type
                  </Label>

                  <Input
                    type='select'
                    id='instanceType'
                    name='instanceType'
                    className={classnames({ 'is-invalid': errors['instanceType'] })}
                    innerRef={register({ required: true })}
                  >
                    <option value=''>Choose</option>
                    <option value='shared'>shared</option>
                    <option value='dedicated'>dedicated</option>
                  </Input>
                </FormGroup>
              </Col>

              <Col sm={12} md={6}>
                <FormGroup className='mb-2'>
                  <div className='d-flex justify-content-start align-items-center'>
                    <Label className='form-label' for='instanceId' style={{ marginRight: '5px' }}>
                      Instance
                    </Label>

                    {showModalButton && (
                      <div className='' style={{ cursor: 'pointer' }}>
                        <Info
                          id='TooltipExample'
                          onClick={() => setModal(!modal)}
                          className='text-primary'
                          style={{ marginBottom: '5px' }}
                          size={20}
                        />
                        <UncontrolledTooltip
                          placement='right'
                          target='TooltipExample'
                        >
                          View the selected instance details!
                        </UncontrolledTooltip>
                      </div>
                    )}
                  </div>

                  <Input
                    type='select'
                    id='instanceId'
                    name='instanceId'
                    className={classnames({ 'is-invalid': errors['instanceId'] })}
                    innerRef={register({ required: true })}
                  >
                    <option value=''>Choose</option>
                    {
                      instancesFetchInProcess ? (
                        <option value=''>Loading...</option>
                      ) : instances && instances.length ? (
                        instances.map(instance => (
                          <option key={instance} value={instance}>
                            {instance}
                          </option>
                        ))
                      ) : instances && instances.length === 0 ? (
                        <option value=''>No instances available</option>
                      ) : (
                        <option value=''>Choose Region First</option>
                      )
                    }
                  </Input>

                  <Modal
                    isOpen={modal}
                    toggle={() => setModal(!modal)}
                    className='modal-dialog-centered'
                    modalClassName='modal-primary'
                  >
                    {instancesSummaryFetchInProcess ? (
                      <p>Loading the instance details!</p>
                    ) : (
                      <>
                        <ModalHeader>Selected Instance Details</ModalHeader>
                        <ModalBody>
                          <Form>
                            <FormGroup row>
                              <Label sm='3' for='id'>
                                ID
                              </Label>
                              <Col sm='9'>
                                <Input type='text' id='id' value={instance && instance.id} readOnly />
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label sm='3' for='vcpus'>
                                vCPU
                              </Label>
                              <Col sm='9'>
                                <Input type='text' id='vcpus' value={instance && instance.vcpus} readOnly />
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label sm='3' for='memory'>
                                Memory
                              </Label>
                              <Col sm='9'>
                                <Input type='text' id='memory' value={instance && instance.memory} readOnly />
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label sm='3' for='disk'>
                                Disk
                              </Label>
                              <Col sm='9'>
                                <Input type='text' id='disk' value={instance && instance.disk} readOnly />
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label sm='3' for='transfer'>
                                Transfer
                              </Label>
                              <Col sm='9'>
                                <Input type='text' id='transfer' value={instance && instance.transfer} readOnly />
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label sm='3' for='priceMonthly'>
                                Monthly Price
                              </Label>
                              <Col sm='9'>
                                <Input type='text' id='priceMonthly' value={instance && `${instance.currency} ${instance.priceMonthly.toFixed(2)}`} readOnly />
                              </Col>
                            </FormGroup>
                          </Form>
                        </ModalBody>
                      </>
                    )}
                  </Modal>
                </FormGroup>
              </Col>

              <Col sm={12} md={6}>
                <FormGroup className='mb-2'>
                  <Label className='form-label' for='imageId'>
                    Image
                  </Label>

                  <Input
                    type='select'
                    id='imageId'
                    name='imageId'
                    className={classnames({ 'is-invalid': errors['imageId'] })}
                    innerRef={register({ required: true })}
                  >
                    <option value=''>Choose</option>

                    {imagesFetchInProcess ? (
                      <option value=''>Loading...</option>
                    ) : images && images.length ? (
                      images.map(image => (
                        <option key={image.id} value={image.id}>
                          {image.name}
                        </option>
                      ))
                    ) : images && images.length === 0 ? (
                      <option value=''>No images available</option>
                    ) : (
                      <option value=''>Choose Instance First</option>
                    )}
                  </Input>
                </FormGroup>
              </Col>

              <Col sm={12} md={6}>
                <FormGroup className='mb-2'>
                  <Label className='form-label' for='type'>
                    Type
                  </Label>
                  <Input
                    type='select'
                    id='type'
                    name='type'
                    className={classnames({ 'is-invalid': errors['type'] })}
                    innerRef={register({ required: true } )}
                  >
                    <option value=''>Choose...</option>
                    <option value='ca'>Certificate Authority</option>
                    <option value='vpn'>VPN Server</option>
                  </Input>
                </FormGroup>
              </Col>

              {type === 'vpn' && (
                <>
                  <Col sm={12} md={6}>
                    <FormGroup className='mb-2'>
                      <Label className='form-label' for='accessType'>
                        Type
                      </Label>
                      <Input
                        type='select'
                        id='accessType'
                        name='accessType'
                        className={classnames({ 'is-invalid': errors['accessType'] })}
                        innerRef={register({ required: true } )}
                      >
                        <option value=''>Choose...</option>
                        <option value='free'>Free</option>
                        <option value='premium'>Premium</option>
                      </Input>
                    </FormGroup>
                  </Col>

                  <Col sm={12} md={6}>
                    <FormGroup className='mb-2'>
                      <Label className='form-label' for='protocol'>
                        Protocols
                      </Label>
                      <Select
                        onChange={handleProtocolsChange}
                        id='protocols'
                        name='protocols'
                        isClearable={false}
                        theme={selectThemeColors}
                        isMulti
                        options={protocolOptions}
                        className='react-select'
                        classNamePrefix='select'
                        className={classnames({ 'is-invalid': errors['protocols'] })}
                        innerRef={register({ required: true })}
                      />

                    </FormGroup>
                  </Col>

                  <Col sm={12} md={6}>
                    <FormGroup>
                      <Label className='form-label' for='dnsProviderId'>
                        DNS Provider
                      </Label>
                      <Input
                        type='select'
                        id='dnsProviderId'
                        name='dnsProviderId'
                        className={classnames({ 'is-invalid': errors['dnsProviderId'] })}
                        innerRef={register({ required: true })}
                      >
                        <option value=''>Choose</option>
                        {dnsFetchInProcess ? (
                          <option value=''>Loading...</option>
                        ) : dnsProviders && dnsProviders.length ? (
                          dnsProviders.map(provider => (
                            <option key={provider.id} value={provider.id}>
                              {provider.name}
                            </option>
                          ))
                        ) : (
                          <option value=''>No DNS Providers available</option>
                        )}
                      </Input>
                    </FormGroup>
                  </Col>
                </>
              )}

              <Col sm='12'>
                <FormGroup className='d-flex-col mb-0'>

                  {success && (
                    <p className="text-success">
                      Server setup was initiated successfully!
                    </p>
                  )}

                  {error && (
                    <p className="text-danger">
                      {error.errors && error.errors.length ? `${error.errors[0].param}: ${error.errors[0].msg}` : error.msg}
                    </p>
                  )}
                  <Button.Ripple className='' type='submit'>
                    Add
                  </Button.Ripple>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      )}
    </Card>
  )
}

export default AddServer
