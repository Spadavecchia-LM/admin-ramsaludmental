import React from 'react'
import { auth } from '../../main'
import { Button } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

const ProfesionalsTable = () => {

const navigate = useNavigate()

  const cerrarSesion = () => {
    auth.signOut()
    navigate("/")
  }

  return (
    <Button onClick={cerrarSesion}>cerrar sesion</Button>
  )
}

export default ProfesionalsTable