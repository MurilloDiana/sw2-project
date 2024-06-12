import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
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
} from 'reactstrap';
import { 
  GET_ALL_ROLES, 
  GET_ALL_USERS, 
  GET_ALL_PETS, 
  CREATE_ROL, 
  CREATE_USER, 
  CREATE_PET 
} from '../../graphql/queries';

const Alerts = () => {
  const [modalType, setModalType] = useState(false);
  const [modalForm, setModalForm] = useState(false);
  const [userType, setUserType] = useState('');

  // Queries
  const { loading: rolesLoading, error: rolesError, data: rolesData } = useQuery(GET_ALL_ROLES);
  const { loading: usersLoading, error: usersError, data: usersData } = useQuery(GET_ALL_USERS);
  const { loading: petsLoading, error: petsError, data: petsData } = useQuery(GET_ALL_PETS);

  // Mutations
  const [createRol] = useMutation(CREATE_ROL, {
    update(cache, { data: { createRol } }) {
      const { getAllRoles } = cache.readQuery({ query: GET_ALL_ROLES });
      cache.writeQuery({
        query: GET_ALL_ROLES,
        data: { getAllRoles: [...getAllRoles, createRol] }
      });
    }
  });
  const [createUser] = useMutation(CREATE_USER, {
    update(cache, { data: { createUser } }) {
      const { getAllUsers } = cache.readQuery({ query: GET_ALL_USERS });
      cache.writeQuery({
        query: GET_ALL_USERS,
        data: { getAllUsers: [...getAllUsers, createUser] }
      });
    }
  });
  const [createPet] = useMutation(CREATE_PET, {
    update(cache, { data: { createPet } }) {
      const { getAllPets } = cache.readQuery({ query: GET_ALL_PETS });
      cache.writeQuery({
        query: GET_ALL_PETS,
        data: { getAllPets: [...getAllPets, createPet] }
      });
    }
  });

  const toggleTypeModal = () => setModalType(!modalType);
  const toggleFormModal = () => setModalForm(!modalForm);

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    toggleTypeModal();
    toggleFormModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      switch (userType) {
        case 'Rol':
          await createRol({
            variables: {
              rolRequest: {
                name: formData.get('name')
              }
            }
          });
          break;
        case 'Usuario':
          await createUser({
            variables: {
              userRequest: {
                names: formData.get('names'),
                lastNames: formData.get('lastNames'),
                ci: formData.get('ci'),
                phone: formData.get('phone'),
                address: formData.get('address'),
                email: formData.get('email'),
                password: formData.get('password'),
                roleId: formData.get('roleId')
              }
            }
          });
          break;
        case 'Mascota':
          await createPet({
            variables: {
              petRequest: {
                name: formData.get('name'),
                species: formData.get('species'),
                breed: formData.get('breed'),
                age: parseInt(formData.get('age'), 10),
                gender: formData.get('gender'),
                color: formData.get('color'),
                userId: formData.get('userId')
              }
            }
          });
          break;
        default:
          break;
      }
      toggleFormModal(); // Cierra el modal después de la creación exitosa
    } catch (error) {
      console.error("Error creando entidad:", error);
    }
  };

  if (rolesLoading || usersLoading || petsLoading) return <p>Loading...</p>;
  if (rolesError || usersError || petsError) return (
    <p>Error: {rolesError?.message || usersError?.message || petsError?.message}</p>
  );

  const renderModalForm = () => {
    switch (userType) {
      case 'Rol':
        return (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Nombre</Label>
              <Input type="text" name="name" id="name" placeholder="Ingrese el nombre" required />
            </FormGroup>
            <Button type="submit" color="primary">Registrar</Button>
          </Form>
        );
      case 'Usuario':
        return (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="names">Nombres</Label>
              <Input type="text" name="names" id="names" placeholder="Ingrese los nombres" required />
            </FormGroup>
            <FormGroup>
              <Label for="lastNames">Apellidos</Label>
              <Input type="text" name="lastNames" id="lastNames" placeholder="Ingrese los apellidos" required />
            </FormGroup>
            <FormGroup>
              <Label for="ci">Cédula de Identidad</Label>
              <Input type="text" name="ci" id="ci" placeholder="Ingrese el CI" required />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Teléfono</Label>
              <Input type="text" name="phone" id="phone" placeholder="Ingrese el teléfono" />
            </FormGroup>
            <FormGroup>
              <Label for="address">Dirección</Label>
              <Input type="text" name="address" id="address" placeholder="Ingrese la dirección" />
            </FormGroup>
            <FormGroup>
              <Label for="email">Correo Electrónico</Label>
              <Input type="email" name="email" id="email" placeholder="Ingrese el correo electrónico" required />
            </FormGroup>
            <FormGroup>
              <Label for="password">Contraseña</Label>
              <Input type="password" name="password" id="password" placeholder="Ingrese la contraseña" required />
            </FormGroup>
            <FormGroup>
              <Label for="roleId">Rol</Label>
              <Input type="select" name="roleId" id="roleId" required>
                <option value="">Seleccione el rol</option>
                {rolesData?.getAllRoles?.map(rol => (
                  <option key={rol.id} value={rol.id}>{rol.name || "Sin nombre"}</option> // Manejo de `null`
                ))}
              </Input>
            </FormGroup>
            <Button type="submit" color="primary">Registrar</Button>
          </Form>
        );
      case 'Mascota':
        return (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Nombre</Label>
              <Input type="text" name="name" id="name" placeholder="Ingrese el nombre" required />
            </FormGroup>
            <FormGroup>
              <Label for="species">Especie</Label>
              <Input type="text" name="species" id="species" placeholder="Ingrese la especie" required />
            </FormGroup>
            <FormGroup>
              <Label for="breed">Raza</Label>
              <Input type="text" name="breed" id="breed" placeholder="Ingrese la raza" required />
            </FormGroup>
            <FormGroup>
              <Label for="age">Edad</Label>
              <Input type="number" name="age" id="age" placeholder="Ingrese edad" required />
            </FormGroup>
            <FormGroup>
              <Label for="gender">Género</Label>
              <Input type="text" name="gender" id="gender" placeholder="Ingrese el género" required />
            </FormGroup>
            <FormGroup>
              <Label for="color">Color</Label>
              <Input type="text" name="color" id="color" placeholder="Ingrese el color" required />
            </FormGroup>
            <FormGroup>
              <Label for="userId">Propietario</Label>
              <Input type="select" name="userId" id="userId" required>
                <option value="">Seleccione el propietario</option>
                {usersData?.getAllUsers?.map(user => (
                  <option key={user.id} value={user.id}>{user.names || "Sin nombre"}</option> // Manejo de `null`
                ))}
              </Input>
            </FormGroup>
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
      <Modal isOpen={modalType} toggle={toggleTypeModal}>
        <ModalHeader toggle={toggleTypeModal}>Seleccione el tipo de usuario</ModalHeader>
        <ModalBody>
          <Button color="primary" onClick={() => handleUserTypeSelect('Usuario')} className="me-2">
            Usuario
          </Button>
          <Button color="secondary" onClick={() => handleUserTypeSelect('Rol')} className="me-2">
            Rol
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
      {/*----- Tabla de roles */}
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-person me-2"> </i> Roles
        </CardTitle>
        <CardBody>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
            {rolesData?.getAllRoles?.length > 0 ? (
              rolesData.getAllRoles.map((rol, index) => (
                <tr key={index}>
                  <td>{index + 1}</td> {/* Número incremental empezando en 1 */}
                  <td>{rol.name || "Sin nombre"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No roles found</td>
              </tr>
            )}
          </tbody>
          </Table>
        </CardBody>
      </Card>
      {/*----- Tabla de usuarios */}
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-people me-2"> </i> Usuarios
        </CardTitle>
        <CardBody>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>CI</th>
                <th>Teléfono</th>
                <th>Correo Electrónico</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {usersData?.getAllUsers?.length > 0 ? (
                usersData.getAllUsers.map((user,index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.names || "Sin nombre"}</td> {/**manejo de null */}
                    <td>{user.lastNames || "Sin apellido"}</td>
                    <td>{user.ci || "Sin CI"}</td>
                    <td>{user.phone || "Sin teléfono"}</td>
                    <td>{user.email || "Sin correo"}</td>
                    <td>{rolesData?.getAllRoles?.find(rol => rol.id === user.roleId)?.name || "Sin rol"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No users found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      {/*----- Tabla de mascotas */}
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-heart"> </i> Mascotas
        </CardTitle>
        <CardBody>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Especie</th>
                <th>Raza</th>
                <th>Edad</th>
                <th>Género</th>
                <th>Color</th>
                <th>Propietario</th>
              </tr>
            </thead>
            <tbody>
              {petsData?.getAllPets?.length > 0 ? (
                petsData.getAllPets.map((pet,index) => (
                  <tr key={index}>
                    <td>{index +1 }</td>
                    <td>{pet.name || "Sin nombre"}</td> {/*Manejo de `null`*/}
                    <td>{pet.species || "Sin especie"}</td>
                    <td>{pet.breed || "Sin raza"}</td>
                    <td>{pet.age ?? "Desconocida"}</td>  {/*Manejo de `null` y `undefined`*/}
                    <td>{pet.gender || "Sin género"}</td>
                    <td>{pet.color || "Sin color"}</td>
                    <td>{usersData?.getAllUsers?.find(user => user.id === pet.userId)?.names || "Sin propietario"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No pets found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default Alerts;
