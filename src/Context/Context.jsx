import { createContext, useEffect, useReducer } from "react";
import {collection, getDocs, getFirestore} from "firebase/firestore"

export const GlobalContext = createContext()


const Context = ({children}) => {

    const initialValue = {
        doctors: []
    }
    const reducer = (state, action) => {
        switch(action.type){
            case "GET_DOCTORS":
                return {...state, doctors: action.payload}
        }
    }

    useEffect(() => {
        const db = getFirestore()
        const itemsCollection = collection(db, "profesionales")

        getDocs(itemsCollection).then((snapshot) => {
            const docs = snapshot.docs.map(doc => doc.data())
            dispatch({type:"GET_DOCTORS", payload:docs})
        })
    },[])

    const [state, dispatch] = useReducer(reducer, initialValue)

    console.log(state)

    return(
        <GlobalContext.Provider value={{state, dispatch}} >
            {children}
        </GlobalContext.Provider>
    )


} 
export default Context