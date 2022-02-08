import {
  Circle,
  Home,
  User,
  List,
  Settings,
  Info,
  Key,
  RefreshCcw,
  Clipboard,
  MapPin,
  Map,
  Mail,
  Server,
} from "react-feather"

export default [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "customers",
    title: "Customers",
    icon: <User size={20} />,
    children: [
      {
        id: "customers-pending",
        title: "Pending",
        icon: <Circle size={12} />,
        navLink: "/customers-pending",
        exact: true,
      },
      {
        id: "customers-completed",
        title: "Completed",
        icon: <Circle size={12} />,
        navLink: "/customers-completed",
        exact: true,
      },
    ],
  },
  {
    id: "subscriptions",
    title: "Subscriptions",
    icon: <Mail size={20} />,
    children: [
      {
        id: "listSubscriptions",
        title: "List Subscriptions",
        icon: <Circle size={12} />,
        navLink: "/subscriptions",
        exact: true,
      },
    ],
  },
  {
    id: "transactions",
    title: "Transactions",
    icon: <RefreshCcw size={20} />,
    children: [
      {
        id: "listTransactions",
        title: "List Transactions",
        icon: <Circle size={12} />,
        navLink: "/transactions",
        exact: true,
      },
    ],
  },
  {
    id: "logs",
    title: "Connection Logs",
    icon: <Info size={20} />,
    children: [
      {
        id: "vpnConnectionLogs",
        title: "List VPN Logs",
        icon: <Circle size={12} />,
        navLink: "/vpn-connection-logs",
        exact: true,
      },
    ],
  },
  {
    id: "support-tickets",
    title: "Support Tickets",
    icon: <List size={20} />,
    children: [
      {
        id: "supportTicketsLists",
        title: "List Support Tickets",
        icon: <Circle size={12} />,
        navLink: "/tickets",
        exact: true,
      },
    ],
  },
  {
    id: "plan",
    title: "Plans",
    icon: <Clipboard size={20} />,
    children: [
      {
        id: "listPlans",
        title: "List Plans",
        icon: <Circle size={12} />,
        navLink: "/plans",
        exact: true,
      },
      {
        id: "addPlan",
        title: "Add Plan",
        icon: <Circle size={12} />,
        navLink: "/add-plan",
        exact: true,
      },
    ],
  },
  {
    id: "countries",
    title: "Countries",
    icon: <MapPin size={20} />,
    children: [
      {
        id: "listCountries",
        title: "List Countries",
        icon: <Circle size={12} />,
        navLink: "/countries",
        exact: true,
      },
    ],
  },
  {
    id: "cities",
    title: "Cities",
    icon: <Map size={20} />,
    children: [
      {
        id: "listCities",
        title: "List Cities",
        icon: <Circle size={12} />,
        navLink: "/cities",
        exact: true,
      },
      {
        id: "addCity",
        title: "Add City",
        icon: <Circle size={12} />,
        navLink: "/add-city",
        exact: true,
      },
    ],
  },
  {
    id: "servers",
    title: "Servers",
    icon: <Server size={20} />,
    children: [
      {
        id: "addServer",
        title: "Add Server",
        icon: <Circle size={12} />,
        navLink: "/add-server",
        exact: true,
      },
      {
        id: "listservers",
        title: "List Servers",
        icon: <Circle size={12} />,
        navLink: "/servers",
        exact: true,
      },
      {
        id: "loadstats",
        title: "Load Stats",
        icon: <Circle size={12} />,
        navLink: "/servers-load-stats",
        exact: true,
      },
    ],
  },
  {
    id: "sshKeys",
    title: "SSH Keys",
    icon: <Key size={20} />,
    children: [
      {
        id: "addSSHKey",
        title: "Add SSH Key",
        icon: <Circle size={12} />,
        navLink: "/add-ssh-key",
        exact: true,
      },
    ],
  },
  {
    id: "settings",
    title: "Settings",
    icon: <Settings size={20} />,
    children: [
      {
        id: "appsettings",
        title: "App Settings",
        icon: <Circle size={12} />,
        navLink: "/settings/app/ad",
        exact: true,
      },
      {
        id: "vpnsettings",
        title: "VPN Settings",
        icon: <Circle size={12} />,
        navLink: "/settings/vpn/blockedapps",
        exact: true,
      },
    ],
  },
  {
    id: "admins",
    title: "Admins",
    icon: <User size={20} />,
    children: [
      {
        id: "admins",
        title: "List Admins",
        icon: <Circle size={12} />,
        navLink: "/admins",
        exact: true,
      },
      {
        id: "register",
        title: "Add an admin",
        icon: <Circle size={12} />,
        navLink: "/register",
        exact: true,
      },
    ],
  },
]
