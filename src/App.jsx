import { Route, Routes } from "react-router-dom";
import LoginForm from "./Components/Login/LoginForm";
import ProfesionalsTable from "./Components/Dashboard/ProfesionalsTable";
import Unauthorized from "./Components/Error/Unauthorized";
import { useState, useEffect } from "react";

function App() {
  const [isTokenValid, setTokenValid] = useState(false);
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
          element={isTokenValid && !tokenIsValidating && localStorage.getItem("accessToken") ? <ProfesionalsTable /> : <Unauthorized />}
        />
        <Route path="/" element={<LoginForm />} />
   
      </Routes>
    </>
  );
}

export default App;
