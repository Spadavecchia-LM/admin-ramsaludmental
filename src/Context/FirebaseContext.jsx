import { createContext, useEffect, useState } from "react";
import {onAuthStateChanged } from "firebase/auth";
import { auth } from "../main";


export const AuthContext = createContext()

const FirebaseContext = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null)

    const [userIsLogged, setUserIsLogged] = useState(false)

    const [loading, setLoading] = useState(true)


    const initializeUser = async (user) => {
        if (user) {

            setCurrentUser({ ...user })
            setUserIsLogged(true)
        } else {
            setCurrentUser(null)
            setUserIsLogged(false)
        }
        setLoading(false)
    }

    const value = {
        currentUser,
        userIsLogged,
        loading
    }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, initializeUser)


        return unsubscribe;
    }, [])



    return (
        <AuthContext.Provider value={{value}}>
            {!loading && children}
        </AuthContext.Provider>
    )

}
export default FirebaseContext