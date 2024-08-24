import { createContext, useContext, useEffect, useState } from 'react'
import { getAuth, User } from 'firebase/auth'

type AuthProviderProps = {
    children: React.ReactNode;
  };

type AuthContextType = {
    isAuthenticated: boolean,
    user: User | null,
    isLoading: boolean,
    login: Function,
    logout: Function
}

const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
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
