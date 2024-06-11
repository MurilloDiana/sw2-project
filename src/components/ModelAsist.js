// AsistenciaModal.js
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import MascotaSelect from './MascotaSelect';
import DuenoSelect from './DuenoSelect';

const AsistenciaModal = ({ isOpen, toggle }) => {
    const [selectedMascota, setSelectedMascota] = useState(null);
    const [ selectedDueno, setSelectedDueno] = useState(null);

  const handleMascotaChange = (selectedOption) => {
    setSelectedMascota(selectedOption);
  };

  const handleDuenoChange = (selectedOption) => {
    setSelectedDueno(selectedOption);
  };

  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const [resultado, setResultado] = useState('');

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleImagenChange = (event) => {
    setImagen(event.target.files[0]);
  };

  const handleResultadoChange = (event) => {
    setResultado(event.target.value);
  };
  const handleSubmit = () => {
    // Manejar el envío del formulario aquí
    console.log('Mascota seleccionada:', selectedMascota);
    console.log('Dueno seleccionada:', selectedDueno);
    toggle();
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Agregar Asistencia Médica</ModalHeader>
      <ModalBody>
        {/* Aquí puedes colocar el formulario o cualquier contenido para la asistencia médica */}
        <form>
          <div className="form-group">
            <label htmlFor="mascota">Nombre de la Mascota</label>
            <MascotaSelect onChange={handleMascotaChange} />
          </div>
          <div className="form-group">
            <label htmlFor="mascota">Nombre de Dueno</label>
            <DuenoSelect onChange={handleDuenoChange} />
          </div>
          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <textarea className="form-control" id="descripcion" rows="3" value={descripcion} onChange={handleDescripcionChange}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="imagen">Imagen</label>
            <input type="file" className="form-control" id="imagen" onChange={handleImagenChange} />
          </div>
          <div className="form-group">
            <label htmlFor="resultado">Resultado</label>
            <textarea className="form-control" id="resultado" rows="3" value={resultado} onChange={handleResultadoChange}></textarea>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>Guardar</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AsistenciaModal;
