import React from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import { auth } from "../../main";
import { useNavigate } from "react-router-dom";
const CustomNavbar = () => {


    const navigate = useNavigate();

    const cerrarSesion = () => {
        auth.signOut();
        localStorage.removeItem("accessToken")
        navigate("/");
      };

  return (
    <div className='h-20 w-screen flex justify-between items-center px-4 mb-24'>
    <div className='w-1/2'>
      <img className='w-24' src="https://res.cloudinary.com/leoms96/image/upload/v1706889662/ramsaludmental/Mask_group_eawvj2.png" alt="ram logo" />
    </div>
    <div>
    <span className='pr-4 cursor-pointer' onClick={() => navigate("/dashboard")}>profesionales</span>
    <span className='pr-4 cursor-pointer'  onClick={() => navigate("/dashboard/mensajes")}>mensajes</span>
    <Button color="danger" size='sm' variant="ghost" onClick={cerrarSesion}>
          cerrar sesion
        </Button>
    </div>
  

  
   
  
  </div>
  )
}

export default CustomNavbar