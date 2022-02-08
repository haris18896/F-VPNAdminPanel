import { CLEAR_APP_SETTING_STATE } from "../../actions/actionType/settings/clear"
import {
  FETCH_SETTINGS_INITIATED,
  FETCH_SETTINGS_SUCCESS,
} from "../../actions/actionType/settings/fetch/ad"
import {
  FETCH_BLOCKEDAPPS_SETTINGS_INITIATED,
  FETCH_BLOCKEDAPPS_SETTINGS_SUCCESS,
} from "../../actions/actionType/settings/fetch/blockedapps"
import {
  FETCH_NOTIFICATION_SETTINGS_INITIATED,
  FETCH_NOTIFICATION_SETTINGS_SUCCESS,
} from "../../actions/actionType/settings/fetch/notification"
import {
  FETCH_PAYMENT_SETTINGS_INITIATED,
  FETCH_PAYMENT_SETTINGS_SUCCESS,
} from "../../actions/actionType/settings/fetch/payment"
import {
  UPDATE_AD_SETTINGS_INITIATED,
  UPDATE_AD_SETTINGS_SUCCESS,
} from "../../actions/actionType/settings/update/ad"
import {
  UPDATE_BLOCKEDAPPS_SETTINGS_INITIATED,
  UPDATE_BLOCKEDAPPS_SETTINGS_SUCCESS,
} from "../../actions/actionType/settings/update/blockedapps"
import {
  UPDATE_NOTIFICATION_SETTINGS_INITIATED,
  UPDATE_NOTIFICATION_SETTINGS_SUCCESS,
} from "../../actions/actionType/settings/update/notification"
import {
  UPDATE_PAYMENT_SETTINGS_INITIATED,
  UPDATE_PAYMENT_SETTINGS_SUCCESS,
} from "../../actions/actionType/settings/update/payment"

// **  Initial State
const initialState = {}

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SETTINGS_INITIATED:
      return {
        inProcess: true,
      }

    case FETCH_SETTINGS_SUCCESS:
      return {
        inProcess: false,
        ad: action.payload.ad,
      }

    case UPDATE_AD_SETTINGS_INITIATED:
      return {
        inProcess: true,
      }
    case UPDATE_AD_SETTINGS_SUCCESS:
      return {
        inProcess: false,
        ad: action.payload.ad,
        status: "SUCCESS",
      }

    case FETCH_PAYMENT_SETTINGS_INITIATED:
      return {
        inProcess: true,
      }
    case FETCH_PAYMENT_SETTINGS_SUCCESS:
      return {
        inProcess: false,
        payment: action.payload.payment,
      }
    case UPDATE_PAYMENT_SETTINGS_INITIATED:
      return {
        inProcess: true,
      }
    case UPDATE_PAYMENT_SETTINGS_SUCCESS:
      return {
        inProcess: false,
        payment: action.payload.payment,
        status: "SUCCESS",
      }

    case FETCH_NOTIFICATION_SETTINGS_INITIATED:
      return {
        inProcess: true,
      }
    case FETCH_NOTIFICATION_SETTINGS_SUCCESS:
      return {
        inProcess: false,
        notification: action.payload.notification,
      }
    case UPDATE_NOTIFICATION_SETTINGS_INITIATED:
      return {
        inProcess: true,
      }
    case UPDATE_NOTIFICATION_SETTINGS_SUCCESS:
      return {
        inProcess: false,
        notification: action.payload.notification,
        status: "SUCCESS",
      }

    case FETCH_BLOCKEDAPPS_SETTINGS_INITIATED:
      return {
        inProcess: true,
      }

    case FETCH_BLOCKEDAPPS_SETTINGS_SUCCESS:
      return {
        inProcess: false,
        blockedApps: action.payload.blockedApps,
      }

    case UPDATE_BLOCKEDAPPS_SETTINGS_INITIATED:
      return {
        inProcess: true,
      }
    case UPDATE_BLOCKEDAPPS_SETTINGS_SUCCESS:
      return {
        inProcess: false,
        blockedApps: action.payload.blockedApps,
        status: "SUCCESS",
      }
    case CLEAR_APP_SETTING_STATE:
      return {}
    default:
      return state
  }
}

export default settingsReducer
