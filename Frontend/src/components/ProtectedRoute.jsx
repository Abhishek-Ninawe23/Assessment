import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children }) => {

    //Wraps a route and redirects to "/login" if user not authenticated.
    const { user, loading } = useSelector((state) => state.auth);

    if (loading) return <div><LoadingSpinner /></div>;

    if (!user) {
        return <Navigate to='/login' replace />
    }
    return children;
}

export default ProtectedRoute