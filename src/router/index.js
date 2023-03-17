import React from 'react';
import {createBrowserRouter, Outlet} from "react-router-dom";
import AuthProvider from "../context/AuthProvider";
import Login from "../components/Login";
import ChatRoom from "../components/ChatRoom";
import AppProvider from "../context/AppProvider";
import AddRoom from "../components/ChatRoom/models/AddRoom";
import InviteMember from "../components/ChatRoom/models/InviteMember";

const AuthLayout = () => {
    return <AuthProvider>
        <AppProvider>
            <Outlet></Outlet>
            <AddRoom></AddRoom>
            <InviteMember></InviteMember>
        </AppProvider>
    </AuthProvider>
}

export default createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {
                element: <Login/>,
                path: '/login'
            },
            {
                element: <ChatRoom/>,
                path: '/'
            }
        ]
    }
])