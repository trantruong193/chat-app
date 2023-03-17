import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Spin} from "antd";
import {auth} from "../firebase/config";
export const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [user,setUser] = useState({displayName: '',photoURL: '',email: '',uid: ''})
    const [isLoading,setIsLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged(user => {
            if (user) {
                const {displayName,photoURL,email,uid} = user
                setUser({displayName,photoURL,email,uid})
                setIsLoading(false)
                navigate('/')
                return
            }
            setUser({displayName: '',photoURL: '',email: '',uid: ''})
            setIsLoading(false)
            navigate('/login')
        })

        return () => {
            unsubscribed()
        }

    },[navigate])

    return (
        <AuthContext.Provider value={{user}}>
            {isLoading ? <Spin/> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;