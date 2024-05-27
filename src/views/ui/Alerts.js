import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  Card,
  Button,
  CardBody,
  CardTitle,
  Form,
  ModalFooter,
  Label,
  FormGroup,
  Input
} from "reactstrap";

const Alerts = () => {
  // For Dismiss Button with Alert
  /*const [visible, setVisible] = useState(true);

  const onDismiss = () => {
    setVisible(false);
  };*/
  const [modalType, setModalType] = useState(false);
  const [modalForm, setModalForm] = useState(false);
  const [userType, setUserType] = useState('');

  const toggleTypeModal = () => setModalType(!modalType);
  const toggleFormModal = () => setModalForm(!modalForm);

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    toggleTypeModal();
    toggleFormModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tipo de usuario:', userType);
    toggleFormModal();
  };
  const [owners, setOwners] = useState([
    { id: 1, name: 'Juan Pérez' },
    { id: 2, name: 'Ana Gómez' },
    { id: 3, name: 'Luis Martínez' }
  ]); // Lista de propietarios

  const renderModalForm = () => {
    switch (userType) {
      case 'Veterinario':
        return (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Nombre</Label>
              <Input type="text" id="name" placeholder="Ingrese el nombre" required />
            </FormGroup>
            <FormGroup>
              <Label for="last">Apellido</Label>
              <Input type="text" id="last" placeholder="Ingrese el apellido" required />
            </FormGroup>
            <FormGroup>
              <Label for="Specialty">Especialidad</Label>
              <Input type="text" id="Specialty" placeholder="Ingrese el especialidad" required />
            </FormGroup>
            <FormGroup>
              <Label for="date">Fecha Nacimiento</Label>
              <Input type="date" id="date" placeholder="Ingrese el Fecha Nacimiento" required />
            </FormGroup>
            <FormGroup>
              <Label for="age">Edad</Label>
              <Input type="number" id="age" placeholder="Ingrese edad" required />
            </FormGroup>
            {/* Agrega aquí los campos específicos para veterinario */}
            <Button type="submit" color="primary">Registrar</Button>
          </Form>
        );
      case 'Dueño':
        return (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Nombre</Label>
              <Input type="text" id="name" placeholder="Ingrese el nombre" required />
            </FormGroup>
            <FormGroup>
              <Label for="last">Apellido</Label>
              <Input type="text" id="last" placeholder="Ingrese el apellido" required />
            </FormGroup>
            <FormGroup>
              <Label for="date">Fecha Nacimiento</Label>
              <Input type="date" id="date" placeholder="Ingrese el Fecha Nacimiento" required />
            </FormGroup>
            <FormGroup>
              <Label for="age">Edad</Label>
              <Input type="number" id="age" placeholder="Ingrese edad" required />
            </FormGroup>
            {/* Agrega aquí los campos específicos para dueño */}
            <Button type="submit" color="primary">Registrar</Button>
          </Form>
        );
      case 'Mascota':
        return (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Nombre</Label>
              <Input type="text" id="name" placeholder="Ingrese el nombre" required />
            </FormGroup>
            <FormGroup>
              <Label for="date">Fecha Nacimiento</Label>
              <Input type="date" id="date" placeholder="Ingrese el Fecha Nacimiento" required />
            </FormGroup>
            <FormGroup>
              <Label for="age">Edad</Label>
              <Input type="number" id="age" placeholder="Ingrese edad" required />
            </FormGroup>
            <FormGroup>
              <Label for="especie">Especie</Label>
              <Input type="text" id="especie" placeholder="Ingrese el nombre" required />
            </FormGroup>
            <FormGroup>
              <Label for="genero">Genero</Label>
              <Input type="text" id="genero" placeholder="Ingrese el nombre" required />
            </FormGroup>
            <FormGroup>
                <Label for="owner">Nombre del Propietario</Label>
                <Input type="select" id="owner" required>
                  <option value="">Seleccione el propietario</option>
                  {owners.map(owner => (
                    <option key={owner.id} value={owner.id}>{owner.name}</option>
                  ))}
                </Input>
              </FormGroup>
            {/* Agrega aquí los campos específicos para mascota */}
            <Button type="submit" color="primary">Registrar</Button>
          </Form>
        );
      default:
        return null;
    }
  };
  return (
    
    <div>
      <Button color="primary" className="mb-3" onClick={toggleTypeModal}>
        <i className="bi bi-plus-circle me-2"></i> Añadir Usuario
      </Button>
       {/* Modal para seleccionar tipo de usuario */}
       <Modal isOpen={modalType} toggle={toggleTypeModal}>
        <ModalHeader toggle={toggleTypeModal}>Seleccione el tipo de usuario</ModalHeader>
        <ModalBody>
          <Button color="primary" onClick={() => handleUserTypeSelect('Dueño')} className="me-2">
            Dueño
          </Button>
          <Button color="secondary" onClick={() => handleUserTypeSelect('Veterinario')} className="me-2">
            Veterinario
          </Button>
          <Button color="info" onClick={() => handleUserTypeSelect('Mascota')}>
            Mascota
          </Button>
        </ModalBody>
      </Modal>
      <Modal isOpen={modalForm} toggle={toggleFormModal}>
        <ModalHeader toggle={toggleFormModal}>Registro de {userType}</ModalHeader>
        <ModalBody>
          {renderModalForm()}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleFormModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>
      {/*----- new cardilla para usuarios*/}
      <Card>
      <CardTitle tag="h6" className="border-bottom p-3 mb-0">
        <i className="bi bi-people me-2"> </i> Usuarios Propietarios
      </CardTitle>
      <CardBody>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Edad</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </Table>
        </CardBody>
      </Card>
            {/*----- new cardilla para usuarios*/}
      <Card>
      <CardTitle tag="h6" className="border-bottom p-3 mb-0">
        <i className="bi bi-heart"> </i> Usuarios Mascotas
      </CardTitle>
      <CardBody>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Genero</th>
                <th>Especie</th>
                <th>Propietario</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </Table>
        </CardBody>
      </Card>
            {/*----- new cardilla para usuarios*/}
      <Card>
      <CardTitle tag="h6" className="border-bottom p-3 mb-0">
        <i className="bi bi-person me-2"> </i> Usuarios Veterinario
      </CardTitle>
      <CardBody>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Especialidad</th>
                <th>Encargado</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </Table>
        </CardBody>
      </Card>
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-1*/}
      {/* --------------------------------------------------------------------------------*/}
      {/*<Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-bell me-2"> </i>
          Alert
        </CardTitle>
        <CardBody className="">
          <div className="mt-3">
            <Alert color="primary">
              This is a primary alert— check it out!
            </Alert>
            <Alert color="secondary">
              This is a secondary alert— check it out!
            </Alert>
            <Alert color="success">
              This is a success alert— check it out!
            </Alert>
            <Alert color="danger">This is a danger alert— check it out!</Alert>
            <Alert color="warning">
              This is a warning alert— check it out!
            </Alert>
            <Alert color="info">This is a info alert— check it out!</Alert>
            <Alert color="light">This is a light alert— check it out!</Alert>
            <Alert color="dark">This is a dark alert</Alert>
          </div>
        </CardBody>
  </Card>*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-2*/}
      {/* --------------------------------------------------------------------------------*/}
     {/* <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-bell me-2" />
          Alert with Links
        </CardTitle>
        <CardBody className="">
          <div>
            <Alert color="primary">
              This is a primary alert with
              <a href="/" className="alert-link">
                an example link
              </a>
              . Give it a click if you like.
            </Alert>
            <Alert color="secondary">
              This is a secondary alert with
              <a href="/" className="alert-link">
                an example link
              </a>
              . Give it a click if you like.
            </Alert>
            <Alert color="success">
              This is a success alert with
              <a href="/" className="alert-link">
                an example link
              </a>
              . Give it a click if you like.
            </Alert>
            <Alert color="danger">
              This is a danger alert with
              <a href="/" className="alert-link">
                an example link
              </a>
              . Give it a click if you like.
            </Alert>
            <Alert color="warning">
              This is a warning alert with
              <a href="/" className="alert-link">
                an example link
              </a>
              . Give it a click if you like.
            </Alert>
            <Alert color="info">
              This is a info alert with
              <a href="/" className="alert-link">
                an example link
              </a>
              . Give it a click if you like.
            </Alert>
            <Alert color="light">
              This is a light alert with
              <a href="/" className="alert-link">
                an example link
              </a>
              . Give it a click if you like.
            </Alert>
            <Alert color="dark">
              This is a dark alert with
              <a href="/" className="alert-link">
                an example link
              </a>
              . Give it a click if you like.
            </Alert>
          </div>
        </CardBody>
</Card>*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-3*/}
      {/* --------------------------------------------------------------------------------*/}
      {/*<Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-bell me-2" />
          Alert with Additional content
        </CardTitle>
        <CardBody className="">
          <div>
            <Alert color="success">
              <h4 className="alert-heading">Well done!</h4>
              <p>
                Aww yeah, you successfully read this important alert message.
                This example text is going to run a bit longer so that you can
                see how spacing within an alert works with this kind of content.
              </p>
              <hr />
              <p className="mb-0">
                Whenever you need to, be sure to use margin utilities to keep
                things nice and tidy.
              </p>
            </Alert>
          </div>
        </CardBody>
</Card>*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-4*/}
      {/* --------------------------------------------------------------------------------*/}
      {/*<Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-bell me-2" />
          Alert with Dissmissing
        </CardTitle>
        <CardBody className="">
          <div>
            <Alert color="info" isOpen={visible} toggle={onDismiss.bind(null)}>
              I am an alert and I can be dismissed!
            </Alert>
          </div>
        </CardBody>
</Card>*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-5*/}
      {/* --------------------------------------------------------------------------------*/}
      {/*<Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-bell me-2" />
          Alert with Uncontrolled [disable] Alerts
        </CardTitle>
        <CardBody className="">
          <div>
            <UncontrolledAlert color="info">
              I am an alert and I can be dismissed!
            </UncontrolledAlert>
          </div>
        </CardBody>
</Card>*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-6*/}
      {/* --------------------------------------------------------------------------------*/}
{/*      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-bell me-2" />
          Alerts without fade
        </CardTitle>
        <CardBody className="">
          <div>
            <Alert
              color="primary"
              isOpen={visible}
              toggle={onDismiss.bind(null)}
              fade={false}
            >
              I am a primary alert and I can be dismissed without animating!
            </Alert>
            <UncontrolledAlert color="warning" fade={false}>
              I am an alert and I can be dismissed without animating!
            </UncontrolledAlert>
          </div>
        </CardBody>
</Card>*/}

      {/* --------------------------------------------------------------------------------*/}
      {/* End Inner Div*/}
      {/* --------------------------------------------------------------------------------*/}
    </div>
  );
};

export default Alerts;
