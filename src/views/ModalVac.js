import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

const ModalVac = ({ isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Control de Vacunas</ModalHeader>
      <ModalBody>
        <p>Detalles sobre las vacunas administradas y programadas.</p>
        <Table bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Vacuna</th>
              <th>Fecha</th>
              <th>Dosis</th>
            </tr>
          </thead>
          <tbody>
            {/* Ejemplo de datos */}
            <tr>
              <th scope="row">1</th>
              <td>Rabia</td>
              <td>2023-01-15</td>
              <td>1ra Dosis</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Parvovirus</td>
              <td>2023-02-20</td>
              <td>1ra Dosis</td>
            </tr>
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
            <tr>
              <th scope="row">1</th>
              <td>Rabia</td>
              <td>2024-01-15</td>
              <td>2da Dosis</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Parvovirus</td>
              <td>2024-02-20</td>
              <td>2da Dosis</td>
            </tr>
          </tbody>
        </Table>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cerrar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalVac;
