import { createContext, useReducer } from "react";


export const GlobalContext = createContext()


const Context = ({children}) => {

    const initialValue = {

    }
    const reducer = (state, action) => {
        switch(action.type){

        }
    }
    const [state, dispatch] = useReducer(reducer, initialValue)


    return(
        <GlobalContext.Provider value={{state, dispatch}} >
            {children}
        </GlobalContext.Provider>
    )


} 
export default Context