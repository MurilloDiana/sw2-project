import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useMutation } from '@apollo/client';
import { CREATE_VISITS } from '../graphql/queries';
import MascotaSelect from './MascotaSelect';
import DoctorSelect from './DoctorSelect';

const AsistenciaModal = ({ isOpen, toggle, onSave }) => {
  const [selectedMascota, setSelectedMascota] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');

  const [createVisits, { loading, error }] = useMutation(CREATE_VISITS);

  const handleMascotaChange = (selectedOption) => {
    setSelectedMascota(selectedOption);
  };

  const handleDoctorChange = (selectedOption) => {
    setSelectedDoctor(selectedOption);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleFechaChange = (event) => {
    setFecha(event.target.value);
  };

  const handleSubmit = () => {
    // Log datos antes de enviar
    console.log('Fecha:', fecha);
    console.log('Descripción:', descripcion);
    console.log('ID Paciente:', selectedMascota?.value);
    console.log('ID Doctor:', selectedDoctor?.value);

    createVisits({
      variables: {
        visitsRequest: {
          date: fecha,
          reason: descripcion,
          idPatient: selectedMascota?.value,
          idDoctor: selectedDoctor?.value,
          status: 'PENDIENTE',
          reserved: true,
        }
      }
    }).then(response => {
      console.log('Visit created:', response.data.createVisits);
      onSave(response.data.createVisits); // Pasar la nueva visita al componente padre
      toggle();
    }).catch(err => {
      console.error('Error creating visit:', err);
    });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Agregar Asistencia Médica</ModalHeader>
      <ModalBody>
        <form>
          <div className="form-group">
            <label htmlFor="mascota">Nombre de la Mascota</label>
            <MascotaSelect onChange={handleMascotaChange} />
          </div>
          <div className="form-group">
            <label htmlFor="doctor">Nombre del Veterinario</label>
            <DoctorSelect onChange={handleDoctorChange} />
          </div>
          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <textarea className="form-control" id="reason" rows="3" value={descripcion} onChange={handleDescripcionChange}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="fecha">Fecha</label>
            <input type="date" className="form-control" id="fecha" value={fecha} onChange={handleFechaChange} />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>Guardar</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AsistenciaModal;
