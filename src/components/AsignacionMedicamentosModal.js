import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap';
import DoctorSelect from './DoctorSelect';

const AsignacionMedicamentosModal = ({ isOpen, toggle, atencion }) => {
  const [medicamentos, setMedicamentos] = useState('');
  const [ fechaP, setFechaP] = useState('');
  const [ selectedDoctor, setSelectedDoctor] = useState('');
  /*vacunas variables*/
  const [nombre_v, setNombre_v] = useState('');
  const [ fechaV, setFechaV] = useState('');
  /*analisis*/
  const [nom_an,setNom_an] = useState('');
  const [fechaA,setFechaA] = useState('');
  const [descr_a,setDesc_a] = useState('');
  const [res_a,setRes_a] = useState('');
  /*observaciones*/
  const [observaciones, setObservaciones] = useState('');
  const [descr_obs, setDescr_Obs] = useState('');
  const [sint_obs, setSint_Obs] = useState('');
  const [trat_obs, setTrat_Obs] = useState('');


  const handleDoctorChange = (selectedOption) => {
    setSelectedDoctor(selectedOption);
  };
  const handleSave = () => {
    // Aquí puedes manejar el guardado de los datos
    console.log('Dueno seleccionada:', selectedDoctor);
    console.log('fecha de presentacion :', fechaP);
    console.log('fecha de vacunacion :', fechaV);
    console.log('Medicamentos:', medicamentos);
    console.log('Vacunas:', nombre_v);
    console.log('Nombre Analisis',nom_an);
    console.log('Fecha de Analisis',fechaA);
    console.log('Descripcion de Analisis',descr_a);
    console.log('Resultado de Analisis',res_a);
    console.log('Observaciones:', descr_obs);
    console.log('Observaciones:', sint_obs);
    console.log('Observaciones:', trat_obs);
    toggle(); // Cierra el modal después de guardar
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Asignación de Medicamentos para {atencion.nombreMascota}</ModalHeader>
      <ModalBody>
        <FormGroup>
            <Label for="doctor">Nombre de Doctor</Label>
            <DoctorSelect onChange={handleDoctorChange} />
            <Label for="fechaP">Fecha de presentación:</Label>
            <Input type="date" id="fechaP" value={fechaP} onChange={(e) => setFechaP(e.target.value)} />
       </FormGroup>
        <FormGroup>
        <Label for="vacunas">Vacunas</Label>
          <br/><Label for="nombre_v">Nombre</Label>
          <Input type="text" id="nombre_v" value={nombre_v} onChange={(e) => setNombre_v(e.target.value)} />
          <br/><Label for="fechaV">Fecha próxima vacuna:</Label>
          <Input type="date" id="fechaV" value={fechaV} onChange={(e) => setFechaV(e.target.value)} />
        </FormGroup>
        <FormGroup>
        <Label for="analisis">Análisis</Label>
          <br/><Label for="fechaA">Fecha del análisis</Label>
          <Input type="date" id="fechaA" value={fechaA} onChange={(e) => setFechaA(e.target.value)} />
          <br/><Label for="nom_an">Nombre</Label>
          <Input type="text" id="nom_an" value={nom_an} onChange={(e) => setNom_an(e.target.value)} />
          <br/><Label for="descr_a">Descripción</Label>
          <Input type="text" id="descr_a" value={descr_a} onChange={(e) => setDesc_a(e.target.value)} />
          <br/><Label for="res_a">Resultado</Label>
          <Input type="text" id="res_a" value={res_a} onChange={(e) => setRes_a(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="observaciones">Observaciones</Label> <br />
          <Label for="descripcion">Descripcion</Label>
          <Input type="textarea" id="obs_desc" value={descr_obs} onChange={(e) => setObservaciones(e.target.value)} />
          <br/><Label for="descripcion">Sintomas</Label>
          <Input type="textarea" id="observaciones" value={sint_obs} onChange={(e) => setObservaciones(e.target.value)} />
          <br/><Label for="descripcion">Tratamientos</Label>
          <Input type="textarea" id="observaciones" value={trat_obs} onChange={(e) => setObservaciones(e.target.value)} />
        
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>Guardar</Button>
        <Button color="secondary" onClick={toggle}>Cerrar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AsignacionMedicamentosModal;