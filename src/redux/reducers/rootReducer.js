// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import { adminsListReducer } from './admin/adminsListReducer'
import { registerReducer } from './admin/registerReducer'
import { profileUpdateReducer } from './admin/profileUpdateReducer'
import { passwordUpdateReducer } from './admin/passwordUpdateReducer'
import { adminUpdateReducer } from './admin/adminUpdateReducer'
import { ticketListReducer } from './ticket/ticketListReducer'
import settingsReducer from './settings'
import { vpnLogsReducer } from './logs'
import sshKeyReducer from './key'
import planReducer from './plan'
import { transactionsListReducer } from './transaction'
import { countryReducer } from './country'
import { cityReducer } from './city'
import { subscriptionListFilter } from './subscription'
import serverReducer from './server'
import { customerReducer } from './customer'
import { customerDetailsReducer } from './customer/details'
import { pendingCustomersReducer } from './customer/pending'
import { completedCustomersReducer } from './customer/completed'
import { getStatsReducer } from './stats/index'
import countryServersLoadStatsReducer from './server/countryServersLoadStats'
import skinReducer from './skin'

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  adminsList: adminsListReducer,
  register: registerReducer,
  profileUpdate: profileUpdateReducer,
  passwordUpdate: passwordUpdateReducer,
  adminUpdate: adminUpdateReducer,
  ticketList: ticketListReducer,
  setting: settingsReducer,
  logs: vpnLogsReducer,
  key: sshKeyReducer,
  plan: planReducer,
  transaction: transactionsListReducer,
  country: countryReducer,
  city: cityReducer,
  subscription: subscriptionListFilter,
  server: serverReducer,
  countryServers: countryServersLoadStatsReducer,
  pendingCustomer: pendingCustomersReducer,
  completedCustomer: completedCustomersReducer,
  customerDetails: customerDetailsReducer,
  skin: skinReducer,
  stats: getStatsReducer,
})

export default rootReducer
