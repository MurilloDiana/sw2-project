import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

const ModalAnalisis = ({ isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Análisis de la Mascota</ModalHeader>
      <ModalBody>
        <p>Detalles sobre los análisis realizados a la mascota.</p>
        <Table bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Tipo de Análisis</th>
              <th>Resultado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {/* Ejemplo de datos */}
            <tr>
              <th scope="row">1</th>
              <td>Hematología</td>
              <td>Normal</td>
              <td>2024-01-15</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Química Sanguínea</td>
              <td>Elevado</td>
              <td>2024-02-10</td>
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

export default ModalAnalisis;