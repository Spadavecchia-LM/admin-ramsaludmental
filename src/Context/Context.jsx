import { createContext, useEffect, useReducer } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";

export const GlobalContext = createContext();

const Context = ({ children }) => {
  const initialValue = {
    doctors: [],
    isEditing: false,
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "GET_DOCTORS":
        return { ...state, doctors: action.payload };
      case "EDIT_DOCTOR":
        return {
          ...state,
          doctors: state.doctors.map((doctor) =>
            doctor.id === action.payload.id
              ? action.payload.updatedDoctor
              : doctor
          ),
          isEditing: true,
        };
      case "IS_EDITING_FALSE":
        return {
          ...state,
          isEditing: false,
        };
      case "ADD_DOCTOR":
        return {
          ...state,
          doctors: [...state.doctors, action.payload],
        };
    }
  };
  const [state, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    const db = getFirestore();
    const itemsCollection = collection(db, "profesionales");

    getDocs(itemsCollection)
      .then((snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          data: { ...doc.data(), id: doc.id, ref: doc.ref },
        }));
        dispatch({ type: "GET_DOCTORS", payload: docs });
      })
      .catch((error) => console.log(error));
  }, []);



  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
export default Context;
