import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const AsistenciaModalView = ({ isOpen, toggle, atencion, users, pets }) => {

  // Función para obtener el nombre de la mascota
  const getPetNameById = (id) => {
    const pet = pets.find(pet => pet.id === id);
    return pet ? pet.name : 'Desconocido';
  };

  // Función para obtener el nombre del dueño
  const getOwnerNameById = (id) => {
    const user = users.find(user => user.id === id);
    return user ? `${user.names} ${user.lastNames}` : 'Desconocido';
  };

  // Función para obtener el nombre del doctor
  const getDoctorNameById = (id) => {
    const doctor = users.find(user => user.id === id);
    return doctor ? `${doctor.names} ${doctor.lastNames}` : 'Desconocido';
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Prevaloración</ModalHeader>
      <ModalBody>
        <p><strong>ID:</strong> {atencion.id}</p>
        <p><strong>Nombre Mascota:</strong> {getPetNameById(atencion.idPatient)}</p>
        <p><strong>Fecha Reserva:</strong> {new Date(atencion.date).toLocaleDateString('es-ES')}</p>
        <p><strong>Descripción:</strong> {atencion.reason}</p>
        
        <p><strong>Doctor:</strong> {getDoctorNameById(atencion.idDoctor)}</p>
        <p><strong>Estado:</strong> {atencion.status}</p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cerrar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AsistenciaModalView;
