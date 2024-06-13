import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useQuery } from '@apollo/client';
import { GET_ALL_ROLES, GET_ALL_USERS } from '../graphql/queries';

const DoctorSelect = ({ onChange }) => {
  const [roleId, setRoleId] = useState(null);
  const [options, setOptions] = useState([]);

  const { data: rolesData, loading: rolesLoading, error: rolesError } = useQuery(GET_ALL_ROLES);
  const { data: usersData, loading: usersLoading, error: usersError } = useQuery(GET_ALL_USERS);

  useEffect(() => {
    if (rolesData && rolesData.getAllRoles) {
      const role = rolesData.getAllRoles.find(rol => rol.name === 'Veterinario');
      if (role) {
        setRoleId(role.id);
      }
    }
  }, [rolesData]);

  useEffect(() => {
    if (usersData && usersData.getAllUsers && roleId) {
      const doctorOptions = usersData.getAllUsers
        .filter(user => user.roleId === roleId)
        .map(user => ({
          value: user.id,
          label: `${user.names} ${user.lastNames}`
        }));
      setOptions(doctorOptions);
    }
  }, [usersData, roleId]);

  if (rolesLoading || usersLoading) return <p>Loading...</p>;
  if (rolesError) return <p>Error loading roles: {rolesError.message}</p>;
  if (usersError) return <p>Error loading users: {usersError.message}</p>;

  return (
    <Select
      options={options}
      onChange={onChange}
      placeholder="Seleccione al doctor"
    />
  );
};

export default DoctorSelect;
