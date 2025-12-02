import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {

    //Wraps a route and redirects to "/login" if user not authenticated.
    const { user } = useSelector((state) => state.auth);

    if (!user) {
        return <Navigate to='/login' replace />
    }
    return children;
}

export default ProtectedRoute