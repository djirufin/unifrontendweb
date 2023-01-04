import { DashboardOutlined, HomeWorkOutlined, ListAltOutlined, MonetizationOnOutlined, } from '@material-ui/icons';
import React from 'react';

// PROFILE COORDINATION
export const SideMenuData = [
    {
        title: "Users",
        icon: <DashboardOutlined />,
        link: "/users"
    },
    {
        title: "New Order",
        icon: <ListAltOutlined />,
        link: "/logistic/no"
    },
    {
        title: "Stock Material",
        icon: <ListAltOutlined />,
        link: "/logistic/mm"
    },
    {
        title: "Organisation",
        icon: <ListAltOutlined />,
        link: "/management/org"
    },
    
];
// PROFILE REGION
export const SideMenuDataRegion = [
    {
        title: "Dashboard",
        icon: <DashboardOutlined />,
        link: "/dashboard"
    },
    {
        title: "Paiements",
        icon: <MonetizationOnOutlined />,
        link: "/paiements"
    },
    {
        title: "Zones",
        icon: <HomeWorkOutlined />,
        link: "/zones"
    },
];
// PROFILE ZONE
export const SideMenuDataUser = [
    {
        title: "Dashboard",
        icon: <DashboardOutlined />,
        link: "/dashboard"
    },
    {
        title: "Paiements",
        icon: <MonetizationOnOutlined />,
        link: "/paiements"
    },
    {
        title: "Eglises",
        icon: <HomeWorkOutlined />,
        link: "/eglises"
    },
];
// PROFILE USER
export const SideMenuDataModerator = [
    {
        title: "Users",
        icon: <DashboardOutlined />,
        link: "/users"
    },
    {
        title: "New Order",
        icon: <ListAltOutlined />,
        link: "/logistic/no"
    },
    {
        title: "Stock Material",
        icon: <ListAltOutlined />,
        link: "/logistic/mm"
    },
    {
        title: "Organisation",
        icon: <ListAltOutlined />,
        link: "/management/org"
    },
]
