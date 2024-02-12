import React, { useContext, useEffect } from 'react'
import CustomNavbar from './CustomNavbar'
import { GlobalContext } from '../../Context/Context'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import {Accordion, AccordionItem} from "@nextui-org/react";

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
    <Accordion className='w-[80vw] mx-auto'>
  {mensajes.map(e => {
 
    const formattedDate = e.data.fecha ? e.data.fecha.toDate() : null;

   
    if (formattedDate) {
      const formatoFecha = `${formattedDate.getDate()}/${formattedDate.getMonth() + 1}/${formattedDate.getFullYear()}`;
      const formatoHora = `${formattedDate.getHours()}:${formattedDate.getMinutes()}:${formattedDate.getSeconds()}`;

      return (
        <AccordionItem indicator={"ver mensaje"} className='py-5' key={e.data.id} aria-label={e.data.nombre} subtitle={e.data.remitente} title={`${e.data.nombre} - enviado el ${formatoFecha} a las ${formatoHora}hs`}>
          {e.data.mensaje}
        </AccordionItem>
      );
    } else {
      return (
        <AccordionItem className='py-5' key={e.data.id} aria-label={e.data.nombre} subtitle={e.data.remitente} title={`${e.data.nombre} - Fecha no disponible`}>
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