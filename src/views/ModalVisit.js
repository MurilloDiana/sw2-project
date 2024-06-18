import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_VISITS_BY_PATIENT_ID, GET_USER_BY_ID } from '../graphql/queries'; // Ajusta la ruta según tu estructura

const ModalVisitas = ({ isOpen, toggle, petId }) => {
  const { data: visitsData, loading: visitsLoading, error: visitsError } = useQuery(GET_VISITS_BY_PATIENT_ID, {
    variables: { id: petId },
  });

  const [doctorNames, setDoctorNames] = useState({});

  const [fetchDoctor, { data: doctorData }] = useLazyQuery(GET_USER_BY_ID);

  useEffect(() => {
    if (visitsData) {
      const fetchDoctorNames = async () => {
        const doctorIds = [...new Set(visitsData.getVisitsByPatientId.map(visit => visit.idDoctor))];
        for (const doctorId of doctorIds) {
          await fetchDoctor({ variables: { id: doctorId } });
        }
      };
      fetchDoctorNames();
    }
  }, [visitsData, fetchDoctor]);

  useEffect(() => {
    if (doctorData) {
      setDoctorNames(prevState => ({
        ...prevState,
        [doctorData.getUserById.id]: doctorData.getUserById.names,
      }));
    }
  }, [doctorData]);

  if (visitsLoading) return <p>Cargando visitas...</p>;
  if (visitsError) return <p>Error al cargar las visitas: {visitsError.message}</p>;

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Visitas del Paciente</ModalHeader>
      <ModalBody>
        <Table bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Fecha</th>
              <th>Motivo</th>
              <th>Doctor</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {visitsData.getVisitsByPatientId.map((visit, index) => (
              <tr key={visit.id}>
                <th scope="row">{index + 1}</th>
                <td>{formatDate(visit.date)}</td>
                <td>{visit.reason}</td>
                <td>{doctorNames[visit.idDoctor] || 'Cargando...'}</td>
                <td>{visit.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cerrar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalVisitas;

const formatDate = (dateString) => {
  if (!dateString) return 'Fecha inválida';

  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  // Si la conversión directa falla, intenta procesar el formato esperado
  const parts = dateString.split(' ');
  if (parts.length === 6) {
    const [ , monthName, day, , , year] = parts;
    const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(monthName);
    if (monthIndex !== -1) {
      const isoDateString = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${day}`;
      const parsedDate = new Date(isoDateString);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
      }
    }
  }

  return 'Fecha inválida';
};
