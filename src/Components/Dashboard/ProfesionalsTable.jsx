import React, { useContext } from "react";
import { auth } from "../../main";
import { Avatar, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
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

const ProfesionalsTable = () => {
  const { state } = useContext(GlobalContext);

  const { doctors } = state;

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

  const navigate = useNavigate();

  const cerrarSesion = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <>
   <CustomNavbar/>

      <div className="w-100 flex justify-start mb-4 pl-4">
        <Button endContent={<AiOutlinePlus />} variant="ghost" color="success" size="md" radius="sm">
          Agregar
        </Button>
      </div>
      <Table isStriped aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn className="text-primaryGreen" key={column.key}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody>
          {doctors.map((row, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <Avatar src={row.imagen}></Avatar>
                </TableCell>
                <TableCell>{row.nombre}</TableCell>
                <TableCell>{row.profesion}</TableCell>
                <TableCell>{row.descripcion}</TableCell>
                <TableCell>{row.especialidad}</TableCell>
                <TableCell>{row.duracionCita}</TableCell>
                <TableCell>{row.precioPesos}</TableCell>
                <TableCell>{row.precioDolares}</TableCell>
                <TableCell>
                  <Accordion isCompact variant="bordered">
                    <AccordionItem
                      aria-label="habilidades"
                      title="habilidades"
                      indicator={({ isOpen }) =>
                        isOpen ? <TbEye /> : <TbEyeClosed />
                      }
                    >
                      {row.habilidades.map((e, index) => (
                        <p key={index}>{e}</p>
                      ))}
                    </AccordionItem>
                  </Accordion>
                </TableCell>
                <TableCell>{row.calendlyLink}</TableCell>
                <TableCell  className="flex gap-2 items-center justify center" >
                  <Button  variant="ghost" size="sm">
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
    </>
  );
};

export default ProfesionalsTable;
