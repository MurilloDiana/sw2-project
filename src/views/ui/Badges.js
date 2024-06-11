import React, { useState } from 'react';
import { Badge, Table,Button, Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import AsistenciaModal from '../../components/ModelAsist';
import AsistenciaModalView from '../../components/AsistenciaModalView';
import AsignacionMedicamentosModal from '../../components/AsignacionMedicamentosModal';

const Badges = () => {
  const [modal, setModal] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [modalAsignacion, setModalAsignacion] = useState(false);
  const [selectedAtencion, setSelectedAtencion] = useState(null);

  const toggleModal = () => setModal(!modal);
  const toggleModalView = () => setModalView(!modalView);
  const toggleModalAsignacion = () => setModalAsignacion(!modalAsignacion);

  const [atenciones, setAtenciones] = useState([
    {
      id: 1,
      nombreMascota: 'Firulais',
      fechaReserva: '2023-06-01',
      descripcion: 'Consulta general',
      dueno: 'Juan Perez',
      estado: 'Pendiente'
    }
  ]);

  const [newAtencion, setNewAtencion] = useState({
    id: '',
    nombreMascota: '',
    fechaReserva: '',
    descripcion: '',
    dueno: '',
    estado: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAtencion({ ...newAtencion, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAtenciones([...atenciones, { ...newAtencion, id: atenciones.length + 1 }]);
    toggleModal();
  };
  const handleViewClick = (atencion) => {
    setSelectedAtencion(atencion);
    toggleModalView();
  };
  const handleAsignacionClick = (atencion) => {
    setSelectedAtencion(atencion);
    toggleModalAsignacion();
  };

  return (
    <div>
    <h2>Control de Asistencia Medica de </h2>
    <h3>Mascotas</h3>
    <Card style={{ marginRight: '10px' }} >
      <CardBody>
        <Button color="danger" style={{ marginRight: '10px' }} onClick={toggleModal} >Agregar Asistencia</Button> 
        <Button color="danger">Reservar Cita</Button>
      </CardBody><AsistenciaModal isOpen={modal} toggle={toggleModal} />
    </Card>
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}
     {/*<Row>
        <Col xs="12" md="12" sm="12">*/}
        <Card>
          <CardBody>
          <CardTitle>
              <h4>Listado de Atenciones</h4>
          </CardTitle>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre Mascota</th>
                <th>Fecha Reserva</th>
                <th>Descripcion</th>
                <th>Dueño</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
            {atenciones.map((atencion) => (
              <tr key={atencion.id}>
                <td>{atencion.id}</td>
                <td>{atencion.nombreMascota}</td>
                <td>{atencion.fechaReserva}</td>
                <td>{atencion.descripcion}</td>
                <td>{atencion.dueno}</td>
                <td>{atencion.estado}</td>
                <td>
                <Button color="primary" style={{ marginRight: '10px' }} onClick={() => handleViewClick(atencion)}>Ver Valoración</Button>
                <Button color="secondary" o onClick={() => handleAsignacionClick(atencion)}>Asignacion de Medicamentos</Button>
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
            onAsignacionClick={handleAsignacionClick}
          />
          <AsignacionMedicamentosModal
            isOpen={modalAsignacion}
            toggle={toggleModalAsignacion}
            atencion={selectedAtencion}
          />
        </>
      )}
    </div>
  );
};

export default Badges;
