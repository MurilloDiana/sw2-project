import React, { useState, useEffect } from 'react';
import { Table, Button, Card, CardBody, CardTitle } from 'reactstrap';
import { useQuery } from '@apollo/client';
import { GET_ALL_VISITS, GET_ALL_USERS, GET_ALL_PETS } from './../../graphql/queries'; // Ajusta la ruta según tu estructura
import AsistenciaModal from '../../components/ModelAsist';
import AsistenciaModalView from '../../components/AsistenciaModalView';
import AsignacionMedicamentosModal from '../../components/AsignacionMedicamentosModal';

const Badges = () => {
  const [modal, setModal] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [modalAsignacion, setModalAsignacion] = useState(false);
  const [selectedAtencion, setSelectedAtencion] = useState(null);
  const [visits, setVisits] = useState([]);
  const [pendingVisits, setPendingVisits] = useState([]);
  const [attendedVisits, setAttendedVisits] = useState([]);

  const { data: visitsData, loading: visitsLoading, error: visitsError } = useQuery(GET_ALL_VISITS);
  const { data: usersData, loading: usersLoading, error: usersError } = useQuery(GET_ALL_USERS);
  const { data: petsData, loading: petsLoading, error: petsError } = useQuery(GET_ALL_PETS);

  useEffect(() => {
    if (visitsData && visitsData.getAllVisits) {
      setVisits(visitsData.getAllVisits);
      const pending = visitsData.getAllVisits.filter(visit => visit.status !== 'Atendido');
      const attended = visitsData.getAllVisits.filter(visit => visit.status === 'Atendido');
      setPendingVisits(pending);
      setAttendedVisits(attended);
    }
  }, [visitsData]);

  const toggleModal = () => setModal(!modal);
  const toggleModalView = () => setModalView(!modalView);
  const toggleModalAsignacion = () => setModalAsignacion(!modalAsignacion);

  const handleViewClick = (atencion) => {
    setSelectedAtencion(atencion);
    toggleModalView();
  };

  const handleAsignacionClick = (atencion) => {
    setSelectedAtencion(atencion);
    toggleModalAsignacion();
  };

  const handleNewVisit = (newVisit) => {
    setVisits([...visits, newVisit]);
    if (newVisit.status !== 'Atendido') {
      setPendingVisits([...pendingVisits, newVisit]);
    }
  };

  const handleUpdateStatus = (id, status) => {
    setVisits(visits.map(visit => visit.id === id ? { ...visit, status } : visit));
    setPendingVisits(pendingVisits.filter(visit => visit.id !== id));
    setAttendedVisits(attendedVisits.concat(visits.filter(visit => visit.id === id).map(visit => ({ ...visit, status }))));
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha inválida';
    
    try {
      const parts = dateString.split(' ');
      if (parts.length === 6) {
        const [dayName, monthName, day, time, zone, year] = parts;
        const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(monthName);
        if (monthIndex !== -1) {
          const isoDateString = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${day}T${time}`;
          console.log('ISO Date String:', isoDateString);
          const date = new Date(isoDateString);
          if (isNaN(date.getTime())) {
            console.error('Fecha inválida después de conversión:', isoDateString);
            return 'Fecha inválida';
          }
          return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          });
        } else {
          console.error('Mes inválido en la fecha:', monthName);
          return 'Fecha inválida';
        }
      } else {
        console.error('Formato de fecha no reconocido:', dateString);
        return 'Fecha inválida';
      }
    } catch (error) {
      console.error('Error formatting date:', error, dateString);
      return 'Fecha inválida';
    }
  };

  if (visitsLoading || usersLoading || petsLoading) return <p>Loading...</p>;
  if (visitsError) return <p>Error loading visits: {visitsError.message}</p>;
  if (usersError) return <p>Error loading users: {usersError.message}</p>;
  if (petsError) return <p>Error loading pets: {petsError.message}</p>;

  return (
    <div>
      <h2>Control de Asistencia Médica de</h2>
      <h3>Mascotas</h3>
      <Card style={{ marginRight: '10px' }}>
        <CardBody>
          <Button color="danger" style={{ marginRight: '10px' }} onClick={toggleModal}>Agregar Asistencia</Button>
          <Button color="danger">Reservar Cita</Button>
        </CardBody>
        <AsistenciaModal isOpen={modal} toggle={toggleModal} onSave={handleNewVisit} />
      </Card>
      <Card>
        <CardBody>
          <CardTitle>
            <h4>Atenciones Pendientes</h4>
          </CardTitle>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th className="px-3">Fecha</th>
                <th className="px-5">Descripción</th>
                <th>Paciente</th>
                <th>Doctor</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pendingVisits.map((atencion, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="px-3">{formatDate(atencion.date)}</td>
                  <td className="px-5">{atencion.reason}</td>
                  <td>{petsData ? petsData.getAllPets.find(pet => pet.id === atencion.idPatient)?.name : 'Desconocido'}</td>
                  <td>{usersData ? usersData.getAllUsers.find(user => user.id === atencion.idDoctor)?.names : 'Desconocido'}</td>
                  <td>{atencion.status}</td>
                  <td>
                    <Button color="primary" style={{ marginRight: '10px' }} onClick={() => handleViewClick(atencion)}>Ver Valoración</Button>
                    <Button color="secondary" onClick={() => handleAsignacionClick(atencion)}>Consulta</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <Card style={{ marginTop: '20px' }}>
        <CardBody>
          <CardTitle>
            <h4>Atenciones Atendidas</h4>
          </CardTitle>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th className="px-3">Fecha</th>
                <th className="px-5">Descripción</th>
                <th>Paciente</th>
                <th>Doctor</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {attendedVisits.map((atencion, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="px-3">{formatDate(atencion.date)}</td>
                  <td className="px-5">{atencion.reason}</td>
                  <td>{petsData ? petsData.getAllPets.find(pet => pet.id === atencion.idPatient)?.name : 'Desconocido'}</td>
                  <td>{usersData ? usersData.getAllUsers.find(user => user.id === atencion.idDoctor)?.names : 'Desconocido'}</td>
                  <td>{atencion.status}</td>
                  <td>
                    <Button color="primary" style={{ marginRight: '10px' }} onClick={() => handleViewClick(atencion)}>Ver Valoración</Button>
                    {/*<Button color="secondary" onClick={() => handleAsignacionClick(atencion)}>Consulta</Button>*/}

                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      {selectedAtencion && (
        <>
          <AsistenciaModalView
            isOpen={modalView}
            toggle={toggleModalView}
            atencion={selectedAtencion}
            users={usersData.getAllUsers}
            pets={petsData.getAllPets}
          />
          <AsignacionMedicamentosModal
            isOpen={modalAsignacion}
            toggle={toggleModalAsignacion}
            atencion={selectedAtencion}
            onUpdateStatus={handleUpdateStatus}
          />
        </>
      )}
    </div>
  );
};

export default Badges;
