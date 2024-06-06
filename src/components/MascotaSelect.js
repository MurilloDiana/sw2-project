// MascotaSelect.js
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
//import axios from 'axios';

const MascotaSelect = ({ onChange }) => {
 /* const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    // Realiza la llamada a la API para obtener la lista de mascotas
    const fetchMascotas = async () => {
      try {
        const response = await axios.get('/api/mascotas'); // Cambia la URL según tu endpoint
        const mascotasData = response.data.map(mascota => ({
          value: mascota.id,
          label: mascota.nombre
        }));
        setMascotas(mascotasData);
      } catch (error) {
        console.error('Error fetching mascotas:', error);
      }
    };

    fetchMascotas();
  }, []);

  return (
    <Select
      options={mascotas}
      onChange={onChange}
      placeholder="Seleccione una mascota"
    />
  );*/
  const mascotas = [
    { value: 1, label: 'Gato 1' },
    { value: 2, label: 'Gato 2' },
    { value: 3, label: 'Gato 3' }
  ];

  return (
    <Select
      options={mascotas}
      onChange={onChange}
      placeholder="Seleccione una mascota"
    />
  );
};

export default MascotaSelect;
