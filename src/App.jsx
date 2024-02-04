import { Route, Routes } from "react-router-dom";
import LoginForm from "./Components/Login/LoginForm";
import ProfesionalsTable from "./Components/Dashboard/ProfesionalsTable";
import Unauthorized from "./Components/Error/Unauthorized";
import { useState, useEffect, useContext } from "react";
import FirebaseContext from "./Context/FirebaseContext";

function App() {
  const [isTokenValid, setTokenValid] = useState(false);
  const {userIsLogged} = useContext(FirebaseContext)
  const [tokenIsValidating, setTokenIsValidating] = useState(true)
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        setTokenValid(true);
        setTokenIsValidating(false)
      }
    };

    validateToken();
  }, []);



  return (
    <>
      <Routes>
        <Route
          path="/dashboard"
          element={isTokenValid && !tokenIsValidating && userIsLogged ? <ProfesionalsTable /> : <Unauthorized />}
        />
        <Route path="/" element={<LoginForm />} />
   
      </Routes>
    </>
  );
}

export default App;
