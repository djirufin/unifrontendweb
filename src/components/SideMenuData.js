import {
  DashboardOutlined,
  LeakAdd,
  ListAltOutlined,
  LiveHelp,
  LocalShipping,
  PersonAdd,
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
    icon: <PersonAdd />,
    link: "/users",
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
        title: "Availability",
        link: "/logistic/av",
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
    link: "/management/org",
  },
];

// PROFILE IPARTNER
export const SideMenuDataIPADMIN = [
  {
    title: "Acknowledge",
    icon: <DashboardOutlined />,
    link: "/logistic/acknowledge",
  },
];

// PROFILE USER
export const SideMenuDataUSER = [
  {
    title: "Users",
    icon: <DashboardOutlined />,
    link: "/users",
  },
  {
    title: "New Order",
    icon: <ListAltOutlined />,
    link: "/logistic/no",
  },
  {
    title: "Stock Material",
    icon: <ListAltOutlined />,
    link: "/logistic/mm",
  },
  {
    title: "Organisation",
    icon: <ListAltOutlined />,
    link: "/management/org",
  },
];
