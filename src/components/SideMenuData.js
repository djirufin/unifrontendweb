import {
  CheckCircle,
  DashboardOutlined,
  Group,
  LeakAdd,
  ListAltOutlined,
  LiveHelp,
  LocalShipping,
  Send,
  Sort,
} from "@material-ui/icons";
import React from "react";

// PROFILE ADMIN
export const SideMenuDataADMIN = [
  {
    title: "Dashboard",
    icon: <DashboardOutlined />,
    link: "/dashboard",
  },
  {
    title: "Organizations",
    icon: <Sort />,
    link: "/management/org",
  },
  {
    title: "Users Managment",
    icon: <Group />,
    link: "/management/use",
  },
  {
    title: "S&L - Transactions",
    icon: <LocalShipping />,
    childrens: [
      {
        title: "Transfer",
        link: "/logistic/no",
        icon: null,
      },
      {
        title: "Product Found",
        link: "/logistic/pf",
        icon: null,
      },
      {
        title: "Issues",
        link: "/logistic/qp",
        icon: null,
      },
      {
        title: "IP Inventory",
        link: "/logistic/ii",
        icon: null,
      },
      {
        title: "Supply",
        link: "/logistic/sup",
        icon: null,
      },
    ],
  },
  {
    title: "EUM - End User Monitoring",
    icon: <LiveHelp />,
    childrens: [
      {
        title: "Regular",
        link: "/monitoring/regular",
        icon: null,
      },
      {
        title: "Adhoc",
        link: "/monitoring/adhoc",
        icon: null,
      },
    ],
  },
  {
    title: "Program Monitoring Visit",
    icon: <LeakAdd />,
    link: "/monitoring/pmv",
  },
];

// PROFILE IPARTNER
export const SideMenuDataIPADMIN = [
  {
    title: "Dashboard",
    icon: <DashboardOutlined />,
    link: "/dashboard",
  },
  {
    title: "Availability",
    link: "/logistic/av",
    icon: <CheckCircle />,
  },
  {
    title: "Dispatch List",
    link: "/logistic/dl",
    icon: <Send />,
  },
];

// PROFILE SUPPLIER
export const SideMenuDataSUPPLIER = [
  {
    title: "Dashboard",
    icon: <DashboardOutlined />,
    link: "/dashboard",
  },
  {
    title: "Supply",
    icon: <ListAltOutlined />,
    link: "/logistic/sup",
  },
];
