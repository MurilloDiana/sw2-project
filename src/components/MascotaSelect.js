import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useQuery } from '@apollo/client';
import { GET_ALL_PETS } from '../graphql/queries';

const MascotaSelect = ({ onChange }) => {
  const [options, setOptions] = useState([]);

  const { data, loading, error } = useQuery(GET_ALL_PETS);

  useEffect(() => {
    if (data && data.getAllPets) {
      const mascotasOptions = data.getAllPets.map(mascota => ({
        value: mascota.id,
        label: mascota.name
      }));
      setOptions(mascotasOptions);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading mascotas: {error.message}</p>;

  return (
    <Select
      options={options}
      onChange={onChange}
      placeholder="Seleccione una mascota"
    />
  );
};

export default MascotaSelect;