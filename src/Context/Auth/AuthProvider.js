import { createContext, useState } from 'react'
import { getSessionUser, getSessionToken } from '../../Services/userSession';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    //handle persist data on page refresh
    const getInitialState = () => {
        const username = getSessionUser();
        const token = getSessionToken()
        return username && token ? { username, token } : {}
    }

    const [auth, setAuth] = useState(getInitialState)

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}