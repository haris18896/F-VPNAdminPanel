import { lazy } from "react"

// ** Document title
const TemplateTitle = "%s - FriendsVPN Admin Template"

// ** Default Route
const DefaultRoute = "/home"

// ** Merge Routes
const Routes = [
  {
    path: "/home",
    component: lazy(() => import("../../views/Home")),
  },
  {
    path: "/admins",
    component: lazy(() => import("../../views/admin/fetch/Admins")),
    exact: true,
  },
  {
    path: "/register",
    component: lazy(() => import("../../views/admin/add/Register")),
    layout: "BlankLayout",
    meta: {
      accessTo: "spradmin",
    },
  },
  {
    path: "/login",
    component: lazy(() => import("../../views/authentication/Login")),
    layout: "BlankLayout",
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/profile/update",
    component: lazy(() => import("../../views/admin/update/UpdateProfile")),
    layout: "BlankLayout",
  },
  {
    path: "/password/update",
    component: lazy(() => import("../../views/admin/update/UpdatePassword")),
    layout: "BlankLayout",
  },
  {
    path: "/admins/update/:id",
    component: lazy(() => import("../../views/admin/update/UpdateAdmin")),
    layout: "BlankLayout",
    meta: {
      accessTo: "spradmin",
    },
  },
  {
    path: "/tickets",
    component: lazy(() => import("../../views/tickets/ListTickets")),
  },
  {
    path: "/settings/app/ad",
    component: lazy(() => import("../../views/settings/app/settingviews/Ad")),
  },
  {
    path: "/settings/app/update",
    component: lazy(() => import("../../views/settings/app/settingviews/AppUpdate")
    ),
  },
  {
    path: "/settings/app/notification",
    component: lazy(() => import("../../views/settings/app/settingviews/Notification")
    ),
  },
  {
    path: "/settings/app/payment",
    component: lazy(() => import("../../views/settings/app/settingviews/Payment")
    ),
  },
  {
    path: "/settings/vpn/blockedapps",
    component: lazy(() => import("../../views/settings/vpn/settingviews/BlockedApps")
    ),
  },
  {
    path: "/vpn-connection-logs",
    component: lazy(() => import("../../views/vpn/index")),
    exact: true,
  },
  {
    path: "/add-ssh-key",
    component: lazy(() => import("../../views/key/add/Add")),
    meta: {
      accessTo: "spradmin",
    },
    exact: true,
  },
  {
    path: "/transactions",
    component: lazy(() => import("../../views/transactions/listTransactions")),
    exact: true,
  },
  {
    path: "/plans",
    component: lazy(() => import("../../views/plan/planviews/plans")),
    exact: true,
  },
  {
    path: "/add-plan",
    component: lazy(() => import("../../views/plan/planviews/addPlan")),
    exact: true,
  },
  {
    path: "/plan-update/:id",
    component: lazy(() => import("../../views/plan/planviews/updatePlan")),
    exact: true,
  },
  {
    path: "/countries",
    component: lazy(() => import("../../views/countries/list/index")),
    exact: true,
  },
  {
    path: "/cities",
    component: lazy(() => import("../../views/city/cityviews/list")),
    exact: true,
  },
  {
    path: "/add-city",
    component: lazy(() => import("../../views/city/cityviews/addCity")),
    exact: true,
  },
  {
    path: "/city-update/:id",
    component: lazy(() => import("../../views/city/cityviews/updateCity")),
    exact: true,
  },
  {
    path: "/subscriptions",
    component: lazy(() => import("../../views/subscription/listSubs")),
    exact: true,
  },
  {
    path: "/add-server",
    component: lazy(() => import("../../views/server/add/addServer")),
    exact: true,
  },
  {
    path: "/servers",
    component: lazy(() => import("../../views/server/list/listServers")),
    exact: true,
  },
  {
    path: "/customers-pending",
    component: lazy(() => import("../../views/customer/list/listCustomers")),
    exact: true,
  },
  {
    path: "/customers-completed",
    component: lazy(() => import("../../views/customer/list/completedCustomers")
    ),
    exact: true,
  },
  {
    path: "/customer-details/:id",
    component: lazy(() => import("../../views/customer/details/customerDetails")
    ),
    exact: true,
  },
  {
    path: "/servers-load-stats",
    component: lazy(() => import("../../views/server/list/listServersLoad")),
    exact: true,
  },
  {
    path: "/error",
    component: lazy(() => import("../../views/404/Error")),
    layout: "BlankLayout",
  },
]

export { DefaultRoute, TemplateTitle, Routes }
