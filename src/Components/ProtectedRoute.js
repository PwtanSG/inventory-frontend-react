import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { getSessionUser, getSessionToken } from '../Services/userSession';


const ProtectedRoute = () => {

    const user = getSessionUser();
    const accessToken = getSessionToken();

    return (
        user && accessToken
            ? <Outlet />
            : <Navigate to="/login" />
    )
}

export default ProtectedRoute
