import React, { createContext, useContext, useEffect, useState } from 'react'
import { getAuth, User } from 'firebase/auth'

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<User | null>()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const auth = getAuth()

    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
            console.log('user', user)
            if (!user) {
                console.log('not logged in!')
                setUser(null)
                setIsLoading(false)
                setIsAuthenticated(false)
            } else {
                console.log('user logged in')
                setIsLoading(false)
                setUser(user)
                setIsAuthenticated(true)
            }
        })
    }, [])

    const login = () => {
        setIsAuthenticated(true)
    }

    const logout = () => {
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, user, isLoading, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export { AuthProvider, useAuth }
