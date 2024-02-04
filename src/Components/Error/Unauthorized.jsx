import { Button } from '@nextui-org/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {

    const navigate = useNavigate()
 
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <Button color='danger' variant="shadow" size="lg" onClick={() => navigate("/")} >Por favor inicie sesión</Button>
    </div>
  )
}

export default Unauthorized