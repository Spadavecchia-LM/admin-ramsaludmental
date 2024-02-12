import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../Context/Context';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import Swal from 'sweetalert2';

const AddDoctorForm = () => {
  const { dispatch,state  } = useContext(GlobalContext);
  const [newDoctor, setNewDoctor] = useState({
    imagen: '',
    nombre: '',
    profesion: '',
    descripcion: '',
    especialidad: '',
    duracionCita: '',
    precioPesos: '',
    precioDolares: '',
    habilidades: [],
    calendlyLink: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "habilidades" && value) {
      setNewDoctor((prevDoctor) => ({
        ...prevDoctor,
        [name]: value.split(", ").map((skill) => skill.trim()),
      }));
    } else {
      setNewDoctor((prevDoctor) => ({
        ...prevDoctor,
        [name]: value,
      }));
    }
  };

  const handleAddDoctor = async () => {
    try {
      const db = getFirestore();
      const doctorCollection = collection(db, 'profesionales');
  
      const docRef = await addDoc(doctorCollection, newDoctor);
  
      const addedDoctor = {
        data: { ...newDoctor, id: docRef.id, ref: docRef },
      };
  
      dispatch({
        type: 'ADD_DOCTOR',  // Utiliza el nuevo caso para agregar un doctor
        payload: addedDoctor,
      });
  
      console.log('Doctor added successfully!');
      Swal.fire({
        icon:"success",
        text:"Añadido con exito"
      })
      setNewDoctor({
        imagen: '',
        nombre: '',
        profesion: '',
        descripcion: '',
        especialidad: '',
        duracionCita: '',
        precioPesos: '',
        precioDolares: '',
        habilidades: [],
        calendlyLink: '',
      });
    } catch (err) {
        Swal.fire({
            icon:"error",
            text:"Ocurrio un error al querer añadir"
          })
    }
  };

  return (
    <div className="max-w-md mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Agregar Doctor</h2>
      <label className="block mb-4">
        Imagen URL:
        <input
          type="text"
          name="imagen"
          value={newDoctor.imagen}
          onChange={handleInputChange}
          className="form-input mt-1 block w-full"
        />
      </label>
      <label className="block mb-4">
        Nombre:
        <input
          type="text"
          name="nombre"
          value={newDoctor.nombre}
          onChange={handleInputChange}
          className="form-input mt-1 block w-full"
        />
      </label>
      <label className="block mb-4">
        Profesión:
        <input
          type="text"
          name="profesion"
          value={newDoctor.profesion}
          onChange={handleInputChange}
          className="form-input mt-1 block w-full"
        />
      </label>
      <label className="block mb-4">
        Descripción:
        <textarea
          name="descripcion"
          value={newDoctor.descripcion}
          onChange={handleInputChange}
          className="form-input mt-1 block w-full"
        />
      </label>
      <label className="block mb-4">
        Especialidad:
        <input
          type="text"
          name="especialidad"
          value={newDoctor.especialidad}
          onChange={handleInputChange}
          className="form-input mt-1 block w-full"
        />
      </label>
      <label className="block mb-4">
        Duración de la cita en minutos:
        <input
          type="text"
          name="duracionCita"
          value={newDoctor.duracionCita}
          onChange={handleInputChange}
          className="form-input mt-1 block w-full"
        />
      </label>
      <label className="block mb-4">
        Precio en Pesos:
        <input
          type="number"
          name="precioPesos"
          value={newDoctor.precioPesos}
          onChange={handleInputChange}
          className="form-input mt-1 block w-full"
        />
      </label>
      <label className="block mb-4">
        Precio en Dólares:
        <input
          type="number"
          name="precioDolares"
          value={newDoctor.precioDolares}
          onChange={handleInputChange}
          className="form-input mt-1 block w-full"
        />
      </label>
      <label className="block mb-4">
        Habilidades (separadas por coma):
        <input
          type="text"
          name="habilidades"
          value={newDoctor.habilidades ? newDoctor.habilidades.join(", ") : ''}
          onChange={handleInputChange}
          className="form-input mt-1 block w-full"
        />
      </label>
      <label className="block mb-4">
        Calendly Link:
        <input
          type="text"
          name="calendlyLink"
          value={newDoctor.calendlyLink}
          onChange={handleInputChange}
          className="form-input mt-1 block w-full"
        />
      </label>
      <button
        onClick={handleAddDoctor}
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Agregar Doctor
      </button>
    </div>
  );
};

export default AddDoctorForm;
