import { Route, Routes } from "react-router-dom";
import LoginForm from "./Components/Login/LoginForm";
import ProfesionalsTable from "./Components/Dashboard/ProfesionalsTable";
import Unauthorized from "./Components/Error/Unauthorized";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./Context/FirebaseContext";
import Mensajes from "./Components/Dashboard/Mensajes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<ProfesionalsTable />} />
        <Route path="/dashboard/mensajes" element={<Mensajes/>}/>
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </>
  );
}

export default App;
