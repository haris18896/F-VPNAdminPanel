import axios from 'axios'
import { getHeadersWithJwtToken } from '../../../utility/Utils'
import jwtDefaultConfig from './jwtDefaultConfig'
import dotenv from 'dotenv'

dotenv.config()

export default class JwtService {
  // ** jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  // ** For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // ** For Refreshing Token
  subscribers = []

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // ** Add request/response interceptor
    // axios.interceptors.request.use(
    //   config => {
    //     // ** Get token from localStorage
    //     const accessToken = this.getToken()
    //     // ** If token is present add it to request's Authorization Header
    //     if (accessToken) {
    //       // ** eslint-disable-next-line no-param-reassign
    //       config.headers.Authorization = `JWT ${localStorage.getItem('accessToken')}`
    //     }
    //     return config
    //   },
    //   error => Promise.reject(error)
    // )

    axios.interceptors.response.use(
      response => response,
      error => {
        // ** const { config, response: { status } } = error
        const { config, response } = error
        const originalRequest = config
        if (response && response.status === 406) {
          localStorage.removeItem('accessToken')
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken))
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  login(data) {
    return axios.post(this.jwtConfig.loginEndpoint, data)
  }

  registerAdmin(data) {
    const headers = getHeadersWithJwtToken()
    return axios.post(this.jwtConfig.registerAdminEndpoint, data, { headers })
  }

  getProfile() {
    const headers = getHeadersWithJwtToken()
    return axios.get(this.jwtConfig.getOwnProfileEndPoint, { headers })
  }

  updateProfile(data) {
    const headers = getHeadersWithJwtToken()
    return axios.put(this.jwtConfig.updateOwnProfileEndPoint, data, { headers })
  }

  updatePassword(data) {
    const headers = getHeadersWithJwtToken()
    return axios.put(this.jwtConfig.updatePasswordEndPoint, data, { headers })
  }

  getAdmin(id) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.getAdminEndPoint}${id}`
    return axios.get(endPoint, { headers })
  }

  getAdmins(page, limit, searchKeyword = null) {
    const headers = getHeadersWithJwtToken()
    let endPoint = `${this.jwtConfig.getAdminsEndPoint}?page=${page}&limit=${limit}`

    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }

    return axios.get(endPoint, { headers })
  }

  updateAdmin(id, data) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.updateAdminEndPoint}${id}`
    return axios.put(endPoint, data, { headers })
  }

  deleteAdmin(id) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.deleteAdminEndPoint}${id}`
    return axios.delete(endPoint, { headers })
  }

  getSupportTicketsDefault(page, limit, statusFilterValue = null, severtiyFilterValue = null, searchKeyword = null) {
    const headers = getHeadersWithJwtToken()

    let endPoint = ''

    if (!statusFilterValue && !severtiyFilterValue) {
      if (!searchKeyword) {
        endPoint = `${this.jwtConfig.defaultSupportTicketsEndPoint}?page=${page}&limit=${limit}`
      } else {
        endPoint = `${this.jwtConfig.defaultSupportTicketsEndPoint}?page=${page}&limit=${limit}&searchKeyword=${searchKeyword}`
      }
    } else if (statusFilterValue && !severtiyFilterValue) {
      if (!searchKeyword) {
        endPoint = `${this.jwtConfig.defaultSupportTicketsEndPoint}?page=${page}&limit=${limit}&status=${statusFilterValue}`
      } else {
        endPoint = `${this.jwtConfig.defaultSupportTicketsEndPoint}?page=${page}&limit=${limit}&status=${statusFilterValue}&searchKeyword=${searchKeyword}`
      }
    } else if (!statusFilterValue && severtiyFilterValue) {
      if (!searchKeyword) {
        endPoint = `${this.jwtConfig.defaultSupportTicketsEndPoint}?page=${page}&limit=${limit}&severity=${severtiyFilterValue}`
      } else {
        endPoint = `${this.jwtConfig.defaultSupportTicketsEndPoint}?page=${page}&limit=${limit}&severity=${severtiyFilterValue}&searchKeyword=${searchKeyword}`
      }
    } else {
      if (!searchKeyword) {
        endPoint = `${this.jwtConfig.defaultSupportTicketsEndPoint}?page=${page}&limit=${limit}&status=${statusFilterValue}&severity=${severtiyFilterValue}`
      } else {
        endPoint = `${this.jwtConfig.defaultSupportTicketsEndPoint}?page=${page}&limit=${limit}&status=${statusFilterValue}&severity=${severtiyFilterValue}&searchKeyword=${searchKeyword}`
      }
    }
    return axios.get(endPoint, { headers })
  }

  closeSupportTicket(id) {
    const headers = getHeadersWithJwtToken()

    const endPoint = `${this.jwtConfig.closeSupportTicketEndPoint}${id}`
    return axios.put(endPoint, {}, { headers })
  }

  getAdSettings() {
    const headers = getHeadersWithJwtToken()

    const endPoint = `${this.jwtConfig.getAdSettingsEndPoint}`
    return axios.get(endPoint, { headers })
  }

  updateAdSettings(data) {
    const headers = getHeadersWithJwtToken()

    const endPoint = `${this.jwtConfig.updateAdSettingsEndPoint}`
    return axios.put(endPoint, data, { headers })
  }

  getPaymentSettings() {
    const headers = getHeadersWithJwtToken()

    const endPoint = `${this.jwtConfig.getPaymentSettingsEndPoint}`
    return axios.get(endPoint, { headers })
  }

  updatePaymentSettings(data) {
    const headers = getHeadersWithJwtToken()

    const endPoint = `${this.jwtConfig.updatePaymentSettingsEndPoint}`
    return axios.put(endPoint, data, { headers })
  }

  getNotificationSettings() {
    const headers = getHeadersWithJwtToken()

    const endPoint = `${this.jwtConfig.getNotificationsSettingsEndPoint}`
    return axios.get(endPoint, { headers })
  }

  updateNotificationSettings(data) {
    const headers = getHeadersWithJwtToken()

    const endPoint = `${this.jwtConfig.updateNotificationSettingsEndPoint}`
    return axios.put(endPoint, data, { headers })
  }

  getBlockedAppsSettings() {
    const headers = getHeadersWithJwtToken()

    const endPoint = `${this.jwtConfig.getBlockedAppsSettingsEndPoint}`
    return axios.get(endPoint, { headers })
  }
  updateBlockedAppsSettings(data) {
    const headers = getHeadersWithJwtToken()

    const endPoint = `${this.jwtConfig.updateBlockedAppsSettingsEndPoint}`
    return axios.put(endPoint, data, { headers })
  }

  addSSHKey(data) {
    const headers = getHeadersWithJwtToken()

    const endPoint = `${this.jwtConfig.addSSHKeyEndPoint}`
    return axios.post(endPoint, data, { headers })
  }

  getPlans() {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.getPlansEndPoint}`
    return axios.get(endPoint, { headers })
  }

  getTransactions(
    page,
    limit,
    transactionTimeFrom,
    transactionTimeTo,
    planFilterValue,
    modeFilterValue,
    statusFilterValue,
    searchKeyword
  ) {
    const headers = getHeadersWithJwtToken()
    let endPoint = `${this.jwtConfig.getTransactionsEndPoint}?page=${page}&limit=${limit}`

    if (planFilterValue) {
      endPoint = `${endPoint}&planId=${planFilterValue}`
    }

    if (modeFilterValue) {
      endPoint = `${endPoint}&mode=${modeFilterValue}`
    }

    if (statusFilterValue) {
      endPoint = `${endPoint}&status=${statusFilterValue}`
    }

    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }

    if (transactionTimeFrom && transactionTimeTo) {
      endPoint = `${endPoint}&transactionTimeFrom=${transactionTimeFrom}&transactionTimeTo=${transactionTimeTo}`
    }

    // if (transactionTimeFrom === transactionTimeTo && transactionTimeFrom !== '') {
    //   endPoint = `${endPoint}&transactionTimeFrom=${transactionTimeFrom}`
    // }
    return axios.get(endPoint, { headers })
  }

  addPlan(data) {
    const headers = getHeadersWithJwtToken()

    const endPoint = `${this.jwtConfig.addPlanEndPoint}`
    return axios.post(endPoint, data, { headers })
  }

  deletePlan(id) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.deletePlanEndPoint}/${id}`
    return axios.delete(endPoint, { headers })
  }

  getPlan(id) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.getPlanEndPoint}/${id}`
    return axios.get(endPoint, { headers })
  }

  updatePlan(data, id) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.updatePlanEndPoint}/${id}`
    return axios.patch(endPoint, data, { headers })
  }

  getCountries(page, limit, continentFilterValue, searchKeyword) {
    const headers = getHeadersWithJwtToken()

    let endPoint = `${this.jwtConfig.getCountriesEndPoint}?page=${page}&limit=${limit}&detail=full`

    if (continentFilterValue) {
      endPoint = `${endPoint}&continent=${continentFilterValue}`
    }

    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }

    return axios.get(endPoint, { headers })
  }

  getAllCountries(limit) {
    const headers = getHeadersWithJwtToken()

    const endPoint = `${this.jwtConfig.getCountriesEndPoint}?limit=${limit}&detail=short`

    return axios.get(endPoint, { headers })
  }

  getContinents() {
    const headers = getHeadersWithJwtToken()
    return axios.get(this.jwtConfig.getContinentsEndPoint, { headers })
  }

  getCities(page, limit, countryIdFilterValue, continentFilterValue, searchKeyword) {
    const headers = getHeadersWithJwtToken()

    let endPoint = `${this.jwtConfig.getCitiesEndPoint}?page=${page}&limit=${limit}&detail=full`

    if (countryIdFilterValue) {
      endPoint = `${endPoint}&countryId=${countryIdFilterValue}`
    }

    if (continentFilterValue) {
      endPoint = `${endPoint}&continent=${continentFilterValue}`
    }

    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }
    return axios.get(endPoint, { headers })
  }

  addCity(data) {
    const headers = getHeadersWithJwtToken()
    return axios.post(this.jwtConfig.addCityEndPoint, data, { headers })
  }

  getCity(id) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.getCityEndPoint}/${id}`
    return axios.get(endPoint, { headers })
  }

  updateCity(data, id) {
    const headers = getHeadersWithJwtToken()

    const endPoint = `${this.jwtConfig.updateCityEndPoint}/${id}`
    return axios.patch(endPoint, data, { headers })
  }

  getSubscriptions(
    page,
    limit,
    planIdFilterValue,
    autoRenewalFilterValue,
    onTrialFilterValue,
    statusFilterValue,
    startTimeFromFilterValue,
    startTimeToFilterValue,
    expiryTimeFromFilterValue,
    expiryTimeToFilterValue,
    searchKeyword
  ) {
    const headers = getHeadersWithJwtToken()

    // alert('Hello Talha')
    let endPoint = `${this.jwtConfig.getSubscriptionsEndPoint}?page=${page}&limit=${limit}`

    // console.log(endPoint)

    if (planIdFilterValue) {
      endPoint = `${endPoint}&planId=${planIdFilterValue}`
    }

    if (autoRenewalFilterValue) {
      endPoint = `${endPoint}&autoRenewal=${autoRenewalFilterValue}`
    }

    if (onTrialFilterValue) {
      endPoint = `${endPoint}&onTrial=${onTrialFilterValue}`
    }

    if (statusFilterValue) {
      endPoint = `${endPoint}&status=${statusFilterValue}`
    }

    if (startTimeFromFilterValue) {
      endPoint = `${endPoint}&startTimeFrom=${startTimeFromFilterValue}`
    }

    if (startTimeToFilterValue) {
      endPoint = `${endPoint}&startTimeTo=${startTimeToFilterValue}`
    }

    if (expiryTimeFromFilterValue) {
      endPoint = `${endPoint}&expiryTimeFrom=${expiryTimeFromFilterValue}`
    }

    if (expiryTimeToFilterValue) {
      endPoint = `${endPoint}&expiryTimeTo=${expiryTimeToFilterValue}`
    }

    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }

    return axios.get(endPoint, { headers })
  }

  disableSubscription(id) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.disableSubscriptionsEndPoint}/${id}`

    return axios.put(endPoint, {}, { headers })
  }

  enableSubscription(id) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.enableSubscriptionsEndPoint}/${id}`

    return axios.put(endPoint, {}, { headers })
  }

  getCloudProviders() {
    const headers = getHeadersWithJwtToken()
    return axios.get(this.jwtConfig.getCloudProvidersEndPoint, { headers })
  }

  getContinentsWithCloudId(cloudId) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.getContinentsEndPointCloudId}/${cloudId}`

    return axios.get(endPoint, { headers })
  }

  getCountriesByContinent(cloudId, continent) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.getCountriesByContinentEndPoint}/${cloudId}/${continent}`
    return axios.get(endPoint, { headers })
  }

  getCitiesByCountry(cloudId, countryId) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.getCitiesByCountryEndPoint}/${cloudId}/${countryId}`
    return axios.get(endPoint, { headers })
  }

  getRegionsByCity(countryId, cityId) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.getRegionsByCityEndPoint}/${countryId}/${cityId}`
    return axios.get(endPoint, { headers })
  }

  getInstancesByRegion(cloudId, regionId, instanceType) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.getInstancesByRegionEndPoint}/${cloudId}/${regionId}/${instanceType}`
    return axios.get(endPoint, { headers })
  }

  getInstanceSummary(cloudId, regionId, instanceType, instanceId) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.getInstanceSummaryEndPoint}/${cloudId}/${regionId}/${instanceType}/${instanceId}`
    return axios.get(endPoint, { headers })
  }

  getImages(id, region) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.getImagesEndPoint}/${id}/${region}`
    return axios.get(endPoint, { headers })
  }

  getDNSProviders() {
    const headers = getHeadersWithJwtToken()
    return axios.get(this.jwtConfig.getDNSProvidersEndPoint, { headers })
  }

  addServer(data) {
    const headers = getHeadersWithJwtToken()
    return axios.post(this.jwtConfig.addServerEndPoint, data, { headers })
  }

  getServers(
    page,
    limit,
    countryIdFilterValue,
    typeFilterValue,
    protocolFilterValue,
    statusFilterValue,
    cloudIdFilterValue,
    searchKeyword = null
  ) {
    const headers = getHeadersWithJwtToken()

    let endPoint = `${this.jwtConfig.getServersEndPoint}?page=${page}&limit=${limit}`

    if (countryIdFilterValue) {
      endPoint = `${endPoint}&countryId=${countryIdFilterValue}`
    }

    if (typeFilterValue) {
      endPoint = `${endPoint}&type=${typeFilterValue}`
    }

    if (protocolFilterValue) {
      endPoint = `${endPoint}&protocol=${protocolFilterValue}`
    }

    if (statusFilterValue) {
      endPoint = `${endPoint}&status=${statusFilterValue}`
    }

    if (cloudIdFilterValue) {
      endPoint = `${endPoint}&cloudId=${cloudIdFilterValue}`
    }

    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }
    return axios.get(endPoint, { headers })
  }

  startServer(id) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.startServerEndPoint}/${id}`
    return axios.put(endPoint, {}, { headers })
  }

  stopServer(id) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.stopServerEndPoint}/${id}`
    return axios.put(endPoint, {}, { headers })
  }

  getCustomers(page, limit, keyword) {
    const headers = getHeadersWithJwtToken()
    let endPoint = `${this.jwtConfig.getCustomersEndPoint}?page=${page}&limit=${limit}`

    if (keyword) {
      endPoint = `${endPoint}&searchKeyword=${keyword}`
    }
    return axios.get(endPoint, { headers })
  }

  getSubscriptionDetails(id, subscriptionStatus) {
    const headers = getHeadersWithJwtToken()

    const endPoint = `${this.jwtConfig.getCustomersEndPoint}?customerId=${id}&subscription=true&subscriptionStatus=${subscriptionStatus}`
    return axios.get(endPoint, { headers })
  }

  getCustomerDetails(id, subscriptionStatus) {
    const headers = getHeadersWithJwtToken()

    const endPoint = `${this.jwtConfig.getCustomersEndPoint}?customerId=${id}&subscription=true&subscriptionStatus=${subscriptionStatus}`
    return axios.get(endPoint, { headers })
  }

  getConnectionLogs(
    page,
    limit,
    countryIdFilterValue,
    continentFilterValue,
    connectionTimeFrom,
    connectionTimeTo,
    searchKeyword = null
  ) {
    const headers = getHeadersWithJwtToken()

    let endPoint = `${this.jwtConfig.getConnectionLogsEndPoint}?page=${page}&limit=${limit}`

    if (countryIdFilterValue) {
      endPoint = `${endPoint}&countryId=${countryIdFilterValue}`
    }

    if (continentFilterValue) {
      endPoint = `${endPoint}&continent=${continentFilterValue}`
    }

    if (connectionTimeFrom && connectionTimeTo) {
      endPoint = `${endPoint}&connectionTimeFrom=${connectionTimeFrom}&connectionTimeTo=${connectionTimeTo}`
    }

    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }

    return axios.get(endPoint, { headers })
  }

  getConnectionLogsDetails(id, page, limit) {
    const headers = getHeadersWithJwtToken()

    let endPoint = `${this.jwtConfig.getConnectionLogsEndPoint}?customerId=${id}`

    if (page & limit) {
      endPoint = `${endPoint}&page=${page}&limit=${limit}`
    }

    return axios.get(endPoint, { headers })
  }

  getSupportTicketsDetails(id, page, limit) {
    const headers = getHeadersWithJwtToken()

    let endPoint = `${this.jwtConfig.defaultSupportTicketsEndPoint}?customerId=${id}`

    if (page && limit) {
      endPoint = `${endPoint}&page=${page}&limit=${limit}`
    }

    return axios.get(endPoint, { headers })
  }

  getTransactionDetails(id, page, limit) {
    const headers = getHeadersWithJwtToken()

    let endPoint = `${this.jwtConfig.getTransactionsEndPoint}?customerId=${id}`

    if (page && limit) {
      endPoint = `${endPoint}&page=${page}&limit=${limit}`
    }

    return axios.get(endPoint, { headers })
  }

  getPendingCustomers(page, limit, searchKeyword) {
    const headers = getHeadersWithJwtToken()

    let endPoint = `${this.jwtConfig.getCustomersEndPoint}?page=${page}&limit=${limit}&subscription=false`

    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }

    return axios.get(endPoint, { headers })
  }

  getCompletedCustomers(page, limit, subscriptionStatus, planIdFilterValue, searchKeyword) {
    const headers = getHeadersWithJwtToken()

    let endPoint = `${this.jwtConfig.getCustomersEndPoint}?page=${page}&limit=${limit}&subscription=true&subscriptionStatus=${subscriptionStatus}`

    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }

    if (planIdFilterValue) {
      endPoint = `${endPoint}&subscriptionPlanId=${planIdFilterValue}`
    }

    return axios.get(endPoint, { headers })
  }

  getServerLoadTypes() {
    const headers = getHeadersWithJwtToken()
    return axios.get(this.jwtConfig.getServerLoadTypesEndPoint, { headers })
  }

  getCountryServersLoadStats(
    page,
    limit,
    countryIdFilterValue,
    loadFilterType,
    protocolFilterValue,
    cloudIdFilterValue,
    searchKeyword = null
  ) {
    const headers = getHeadersWithJwtToken()

    let endPoint = `${this.jwtConfig.getCountryServersLoadStatsEndPoint}?page=${page}&limit=${limit}`

    if (countryIdFilterValue) {
      endPoint = `${endPoint}&countryId=${countryIdFilterValue}`
    }

    if (loadFilterType) {
      endPoint = `${endPoint}&loadTypeId=${loadFilterType}`
    }

    if (protocolFilterValue) {
      endPoint = `${endPoint}&protocol=${protocolFilterValue}`
    }

    if (cloudIdFilterValue) {
      endPoint = `${endPoint}&cloudId=${cloudIdFilterValue}`
    }

    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }

    return axios.get(endPoint, { headers })
  }

  getMainVpnProtocols() {
    const headers = getHeadersWithJwtToken()
    return axios.get(this.jwtConfig.getMainVpnProtocolsEndPoint, { headers })
  }

  getVpnProtocols() {
    const headers = getHeadersWithJwtToken()
    return axios.get(this.jwtConfig.getMainVpnProtocolsEndPoint, { headers })
  }

  refreshToken() {
    return axios.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken(),
    })
  }

  getStats() {
    const headers = getHeadersWithJwtToken()
    return axios.get(this.jwtConfig.getStatsEndPoint, { headers })
  }
}
