import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

const ProtectedRoute = () => {
    const navigate = useNavigate()
    const { isAuthenticated, isLoading } = useAuth()
    console.log('logged in?', isAuthenticated)

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            return navigate('/login')
        }
    }, [isLoading])

    return <Outlet />
}

export default ProtectedRoute
