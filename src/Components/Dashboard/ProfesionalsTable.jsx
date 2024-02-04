import React, { useContext, useState,useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore"
import { Avatar } from "@nextui-org/react";
import {
  Modal,
  ModalContent,

  Button,
  useDisclosure,
} from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { GlobalContext } from "../../Context/Context";
import { TbEye } from "react-icons/tb";
import { TbEyeClosed } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import CustomNavbar from "./CustomNavbar";
import EditDoctorForm from "../Utils/EditDoctorForm";
import { IoIosRefresh } from "react-icons/io";
import AddDoctorForm from "../Utils/AddDoctorForm";
import { AuthContext } from "../../Context/FirebaseContext";
import Unauthorized from "../Error/Unauthorized";

const ProfesionalsTable = () => {
  const { state,dispatch } = useContext(GlobalContext);
  const { doctors } = state || {};
  const {value} = useContext(AuthContext)
  const {userIsLogged} = value
 
  

  const editDisclosure = useDisclosure(); // Para el modal de edición
  const addDisclosure = useDisclosure(); 

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const refresh = () => {
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
  }


  


  

  const columns = [
    {
      key: "imagen",
      label: "imagen",
    },
    {
      key: "nombre",
      label: "nombre",
    },
    {
      key: "profesion",
      label: "profesion",
    },
    {
      key: "descripcion",
      label: "descripcion",
    },
    {
      key: "especialidad",
      label: "especialidad",
    },
    {
      key: "duracion cita",
      label: "duracion cita",
    },
    {
      key: "precio en pesos",
      label: "precio en pesos",
    },
    {
      key: "precio en dolares",
      label: "precio en dolares",
    },
    {
      key: "habilidades",
      label: "habilidades",
    },
    {
      key: "link calendly",
      label: "link calendly",
    },
    {
      key: "acciones",
      label: "acciones",
    },
  ];

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    editDisclosure.onOpen()
  };
  const handleAdd = () => {
    addDisclosure.onOpen();
  }

  return (
    <>
    {userIsLogged && localStorage.getItem("accessToken") ? 
     <>
     <CustomNavbar />

     <div className="w-100 flex items-center justify-between mb-4 px-4">
       <Button
         endContent={<AiOutlinePlus />}
         variant="ghost"
         color="success"
         size="md"
         radius="sm"
         onClick={handleAdd}

       >
         Agregar
       </Button>

       <Button variant="ghost" color="black" size="sm" onClick={() => refresh()}><IoIosRefresh /></Button>
     </div>
     <Table isStriped aria-label="Example table with dynamic content" className="px-4">
       <TableHeader columns={columns}>
         {(column) => (
           <TableColumn className="text-primaryGreen" key={column.key}>
             {column.label}
           </TableColumn>
         )}
       </TableHeader>
       <TableBody>
         { doctors  &&
           doctors.map((row, index) => {
             return (
               <TableRow key={index}>
                 <TableCell>
                   <Avatar src={row.data.imagen}></Avatar>
                 </TableCell>
                 <TableCell>{row.data.nombre}</TableCell>
                 <TableCell>{row.data.profesion}</TableCell>
                 <TableCell>{row.data.descripcion}</TableCell>
                 <TableCell>{row.data.especialidad}</TableCell>
                 <TableCell>{row.data.duracionCita}</TableCell>
                 <TableCell>{row.data.precioPesos}</TableCell>
                 <TableCell>{row.data.precioDolares}</TableCell>
                 <TableCell>
                   <Accordion isCompact variant="bordered">
                     <AccordionItem
                       aria-label="habilidades"
                       title="habilidades"
                       indicator={({ isOpen }) =>
                         isOpen ? <TbEye /> : <TbEyeClosed />
                       }
                     >
                       {row.data.habilidades.map((e, index) => (
                         <p key={index}>{e}</p>
                       ))}
                     </AccordionItem>
                   </Accordion>
                 </TableCell>
                 <TableCell>{row.data.calendlyLink}</TableCell>
                 <TableCell className="flex gap-2 items-center justify center py-4">
                   <Button
                     onClick={() => handleEdit(row)}
                     variant="ghost"
                     size="sm"
                     
                   >
                     <FaRegEdit className="text-primary" />
                   </Button>

                   <Button variant="ghost" size="sm">
                     <FaTrash className="text-danger" />
                   </Button>
                 </TableCell>
               </TableRow>
             );
           })}
       </TableBody>
     </Table>
     <Modal isOpen={editDisclosure.isOpen} onClose={editDisclosure.onClose} scrollBehavior="inside">
       <ModalContent>
         {selectedDoctor && <EditDoctorForm doctor={selectedDoctor} />}
       </ModalContent>
     </Modal>
     <Modal isOpen={addDisclosure.isOpen} onClose={addDisclosure.onClose} scrollBehavior="inside">
       <ModalContent>
         <AddDoctorForm />
       </ModalContent>
     </Modal>
     </>
     :
     <Unauthorized/>
  }
 
    </>
  );
};

export default ProfesionalsTable;
