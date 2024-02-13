import React, { useContext, useEffect } from 'react'
import CustomNavbar from './CustomNavbar'
import { GlobalContext } from '../../Context/Context'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import {Accordion, AccordionItem, Avatar} from "@nextui-org/react";

const Mensajes = () => {


    const {state,dispatch} = useContext(GlobalContext)

    useEffect(() => {
        const db = getFirestore()
        const itemsCollection = collection(db, "mensajes")

        getDocs(itemsCollection)
            .then(snapshot => {
                const docs = snapshot.docs.map(doc => ({
                    data: {...doc.data(), id:doc.id}
                }))
                dispatch({type:"GET_MENSAJES", payload: docs})
            })


    },[])

    const {mensajes} = state



  return (
    <>
    <CustomNavbar/>
    <Accordion className='w-[70vw] mx-auto'>
  {mensajes.map(e => {
 
    const formattedDate = e.data.fecha ? e.data.fecha.toDate() : null;

   
    if (formattedDate) {
      const formatoFecha = `${formattedDate.getDate()}/${formattedDate.getMonth() + 1}/${formattedDate.getFullYear()}`;
      const formatoHora = `${formattedDate.getHours()}:${formattedDate.getMinutes()}:${formattedDate.getSeconds()}`;

      return (
        <AccordionItem startContent={<Avatar radius='sm' color='primary' name={e.data.nombre.substring(0,1).toUpperCase()}/>} indicator={"ver mensaje"} className='py-5 text-sm' key={e.data.id} aria-label={e.data.nombre} subtitle={`mail: ${e.data.remitente}`} title={`De: ${e.data.nombre} recibido el ${formatoFecha} a las ${formatoHora}hs`}>
          {e.data.mensaje}
        </AccordionItem>
      );
    } else {
      return (
        <AccordionItem startContent={<Avatar radius='sm' color='primary' name={e.data.nombre.substring(0,1).toUpperCase()}/>} indicator={"ver mensaje"} className='py-5 text-sm' key={e.data.id} aria-label={e.data.nombre} subtitle={e.data.remitente} title={`De: ${e.data.nombre} Fecha no disponible`}>
          {e.data.mensaje}
        </AccordionItem>
      );
    }
  })}
</Accordion>
    </>
  )
}

export default Mensajes