import {
  CheckCircle,
  DashboardOutlined,
  Group,
  LeakAdd,
  ListAltOutlined,
  LiveHelp,
  LocalShipping,
  Receipt,
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
    title: "Users",
    icon: <Group />,
    link: "/management/use",
  },
  {
    title: "Organisations",
    icon: <Sort />,
    link: "/management/org",
  },
  {
    title: "Supply and Logistics",
    icon: <LocalShipping />,
    childrens: [
      {
        title: "Transfer",
        link: "/logistic/no",
        icon: null,
      },
      {
        title: "Trace Product",
        link: "/logistic/tp",
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
    title: "End User Monitoring",
    icon: <LiveHelp />,
    childrens: [
      {
        title: "Nutrition",
        link: "/monitoring/nu",
        icon: null,
      },
      {
        title: "Wash",
        link: "/monitoring/wa",
        icon: null,
      },
      {
        title: "Education",
        link: "/monitoring/ed",
        icon: null,
      },
    ],
  },
  {
    title: "Perform Monitoring Visit",
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
    title: "Acknowledge",
    icon: <Receipt />,
    link: "/logistic/ack",
  },
  {
    title: "Availability",
    link: "/logistic/av",
    icon: <CheckCircle />,
  },
  {
    title: "Dispatch",
    icon: <Send />,
    childrens: [
      {
        title: "Create Dispatch",
        link: "/logistic/cd",
        icon: null,
      },
      {
        title: "Material Withdrawal",
        link: "/logistic/wm",
        icon: null,
      },
    ],
    //,
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
