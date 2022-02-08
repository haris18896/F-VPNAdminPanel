import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_DNS_PROVIDERS_INITIATED,
  FETCH_DNS_PROVIDERS_SUCCESS,
} from "../../../actionType/server/fetch/dnsProviders"

export const initiateFetchDnsProviders = () => ({ type: FETCH_DNS_PROVIDERS_INITIATED })

export const handleFetchDNSProviders = () => {
  return async (dispatch) => {
    try {
      dispatch(initiateFetchDnsProviders())
      const response = await useJwt.getDNSProviders()
      if (response && response.data) {
        dispatch({ type: FETCH_DNS_PROVIDERS_SUCCESS, payload: response.data })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
