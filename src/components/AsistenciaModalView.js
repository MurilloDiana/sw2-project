import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const AsistenciaModalView = ({ isOpen, toggle, atencion , onAsignacionClick}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Prevaloración de {atencion.nombreMascota}</ModalHeader>
      <ModalBody>
        <p><strong>ID:</strong> {atencion.id}</p>
        <p><strong>Nombre Mascota:</strong> {atencion.nombreMascota}</p>
        <p><strong>Fecha Reserva:</strong> {atencion.fechaReserva}</p>
        <p><strong>Descripción:</strong> {atencion.descripcion}</p>
        <p><strong>Dueño:</strong> {atencion.dueno}</p>
        <p><strong>Estado:</strong> {atencion.estado}</p>
      </ModalBody>
      <ModalFooter>
        
        <Button color="secondary" onClick={toggle}>Cerrar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AsistenciaModalView;