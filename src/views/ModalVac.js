import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import { useQuery } from '@apollo/client';
import { GET_VACCINE_BY_ID_PATIENT } from '../graphql/queries';

const ModalVac = ({ isOpen, toggle, petId }) => {
  const { data, loading, error } = useQuery(GET_VACCINE_BY_ID_PATIENT, {
    variables: { id: petId },
  });

  const vaccineData = data?.getVaccineByIdPatient || [];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Fecha inválida' : date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) return <p>Cargando vacunas...</p>;
  if (error) return <p>Error al cargar las vacunas: {error.message}</p>;

  if (vaccineData.length === 0) {
    return (
      <Modal isOpen={isOpen} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Control de Vacunas</ModalHeader>
        <ModalBody>
          <p>No hay formulario disponible para las vacunas de esta mascota.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cerrar</Button>
        </ModalFooter>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Control de Vacunas</ModalHeader>
      <ModalBody>
        <Table bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Vacuna</th>
              <th>Fecha Administrada</th>
              <th>Dosis</th>
            </tr>
          </thead>
          <tbody>
            {vaccineData.map((vaccine, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{vaccine.vaccineName}</td>
                <td>{formatDate(vaccine.administeredDate)}</td>
                <td>{vaccine.doses}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h5>Vacunas Futuras</h5>
        <Table bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Vacuna</th>
              <th>Fecha Programada</th>
              <th>Dosis</th>
            </tr>
          </thead>
          <tbody>
            {vaccineData.map((vaccine, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{vaccine.vaccineName}</td>
                <td>{formatDate(vaccine.nextAdministeredDate)}</td>
                <td>{vaccine.doses}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cerrar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalVac;
