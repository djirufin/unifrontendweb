import { DashboardOutlined, ListAltOutlined } from '@material-ui/icons';
import React from 'react';

// PROFILE ADMIN
export const SideMenuDataADMIN = [
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
    // {
    //     title: "Stock Material",
    //     icon: <ListAltOutlined />,
    //     link: "/logistic/mm"
    // },
    {
        title: "Organisation",
        icon: <ListAltOutlined />,
        link: "/management/org"
    },
    
];

// PROFILE IPARTNER
export const SideMenuDataIPADMIN = [
    {
        title: "Acknowledge",
        icon: <DashboardOutlined />,
        link: "/logistic/acknowledge"
    },
];

// PROFILE USER
export const SideMenuDataUSER = [
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
