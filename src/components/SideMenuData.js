import { DashboardOutlined, HomeWorkOutlined, MonetizationOnOutlined, } from '@material-ui/icons';
import React from 'react';

// PROFILE COORDINATION
export const SideMenuData = [
    {
        title: "Dashboard",
        icon: <DashboardOutlined />,
        link: "/dashboard"
    },
    {
        title: "Paiments",
        icon: <MonetizationOnOutlined />,
        link: "/paiements"
    },
    {
        title: "Regions",
        icon: <HomeWorkOutlined />,
        link: "/regions"
    },
    // {
    //     title: "Profile",
    //     icon: <SupervisorAccountOutlined />,
    //     link: "/profile"
    // }
    
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
// PROFILE LOCAL
export const SideMenuDataModerator = [
    {
        title: "Dashboard",
        icon: <DashboardOutlined />,
        link: "/dashboard"
    },
    {
        title: "Paiements",
        icon: <MonetizationOnOutlined />,
        link: "/paiements"
    }
]
