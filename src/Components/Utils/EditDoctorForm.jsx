import React, { useContext, useState,useEffect } from "react";
import { GlobalContext } from "../../Context/Context";
import {  getFirestore, collection,updateDoc } from "firebase/firestore";
import Swal from 'sweetalert2'

const EditDoctorForm = ({ doctor }) => {
  const { dispatch } = useContext(GlobalContext);

  const [updatedDoctor, setUpdatedDoctor] = useState(doctor);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "habilidades" && value) {
      setUpdatedDoctor((prevDoctor) => ({
        ...prevDoctor,
        data: {
          ...prevDoctor.data,
          [name]: value.split(", ").map((skill) => skill.trim()),
        },
      }));
    } else {
      setUpdatedDoctor((prevDoctor) => ({
        ...prevDoctor,
        data: {
          ...prevDoctor.data,
          [name]: value,
        },
      }));
    }
  };
  
  

  const handleEditDoctor = async () => {
    try {
      const db = getFirestore();
      const doctorCollection = collection(db, "profesionales");
  
      await updateDoc(doctor.data.ref, {
        imagen: updatedDoctor.data.imagen,
        nombre: updatedDoctor.data.nombre,
        profesion: updatedDoctor.data.profesion,
        descripcion: updatedDoctor.data.descripcion,
        especialidad: updatedDoctor.data.especialidad,
        duracionCita: updatedDoctor.data.duracionCita,
        precioPesos: updatedDoctor.data.precioPesos,
        precioDolares: updatedDoctor.data.precioDolares,
        habilidades: updatedDoctor.data.habilidades,
        calendlyLink: updatedDoctor.data.calendlyLink,
      });
  
      dispatch({
        type: "EDIT_DOCTOR",
        payload: { id: doctor.data.id, updatedDoctor },
      });
      Swal.fire({
        title:"Cambios realizados con exito",
        icon:"success",
      });
      
      dispatch({type:"IS_EDITING_FALSE"})
      
      console.log("Document successfully updated in Firebase!");
    } catch (err) {
      console.error(err);
    }
  };



  return (
    <div className=" max-w-md mt-8 p-6 bg-white rounded-md shadow-md">
    <h2 className="text-2xl font-semibold mb-4">Editar doctor</h2>
    <label className="block mb-4">
      id
      <input
        type="text"
        name="id"
        value={updatedDoctor.data.id}
        disabled
        className="form-input mt-1 block w-full"
      />
    </label>
    <label className="block mb-4">
      url de la imagen
      <input
        type="text"
        name="imagen"
        value={updatedDoctor.data.imagen}
        onChange={handleInputChange}
        className="form-input mt-1 block w-full"
      />
    </label>
    <label className="block mb-4">
      Nombre:
      <input
        type="text"
        name="nombre"
        value={updatedDoctor.data.nombre}
        onChange={handleInputChange}
        className="form-input mt-1 block w-full"
      />
    </label>
    <label className="block mb-4">
      Profesion:
      <input
        type="text"
        name="profesion"
        value={updatedDoctor.data.profesion}
        onChange={handleInputChange}
        className="form-input mt-1 block w-full"
      />
    </label>
    <label className="block mb-4">
      Descripcion:
      <textarea
        name="descripcion"
        value={updatedDoctor.data.descripcion}
        onChange={handleInputChange}
        className="form-input mt-1 block w-full"
      />
    </label>
    <label className="block mb-4">
      Especialidad:
      <input
        type="text"
        name="especialidad"
        value={updatedDoctor.data.especialidad}
        onChange={handleInputChange}
        className="form-input mt-1 block w-full"
      />
    </label>
    <label className="block mb-4">
      Duracion de la cita:
      <input
        type="text"
        name="duracionCita"
        value={updatedDoctor.data.duracionCita}
        onChange={handleInputChange}
        className="form-input mt-1 block w-full"
      />
    </label>
    <label className="block mb-4">
      Precio en Pesos:
      <input
        type="number"
        name="precioPesos"
        value={updatedDoctor.data.precioPesos}
        onChange={handleInputChange}
        className="form-input mt-1 block w-full"
      />
    </label>
    <label className="block mb-4">
      Precio en dolares:
      <input
        type="number"
        name="precioDolares"
        value={updatedDoctor.data.precioDolares}
        onChange={handleInputChange}
        className="form-input mt-1 block w-full"
      />
    </label>
    <label className="block mb-4">
      Habilidades (separadas en comas):
      <input
        type="text"
        name="habilidades"
        value={updatedDoctor.data.habilidades ? updatedDoctor.data.habilidades.join(", ") : ''}
        onChange={handleInputChange}
        className="form-input mt-1 block w-full"
      />
    </label>
    <label className="block mb-4">
      Link de Calendly:
      <input
        type="text"
        name="calendlyLink"
        value={updatedDoctor.data.calendlyLink}
        onChange={handleInputChange}
        className="form-input mt-1 block w-full"
      />
    </label>
    <button
      onClick={handleEditDoctor}
      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600"
    >
     confirmar cambios
    </button>
  </div>
  )
};

export default EditDoctorForm;
