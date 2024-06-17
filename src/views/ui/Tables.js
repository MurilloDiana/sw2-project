import React from 'react';
import { Row, Col, Table, Card, CardTitle, CardBody, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom'; 
import { useQuery } from '@apollo/client';
import { GET_ALL_PETS } from '../../graphql/queries';

const Tables = () => {
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_ALL_PETS);

 const handleButtonClick = (id) => {
  navigate(`/historial/${id}`); // Redirige a la vista de historial específico de la mascota
};

if (loading) return <p>Cargando...</p>;
if (error) return <p>Error al cargar los datos de mascotas: {error.message}</p>;

  // Datos de ejemplo para la tabla
 /* const petData = [
    { id: 1, name: 'Rex', species: 'Perro', owner: 'Juan', history: 'Consulta anual' },
    { id: 2, name: 'Mimi', species: 'Gato', owner: 'Ana', history: 'Vacunación' },
    { id: 3, name: 'Coco', species: 'Loro', owner: 'Luis', history: 'Chequeo' },
    
  ];*/
  const petData = data?.getAllPets || [];
  return (
    <Row>
    {/*</Row><ProjectTables />*/} 
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Tablas de Historiales de Mascotas
          </CardTitle>
          <CardBody className="">
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre de Mascota</th>
                  <th>Especie</th>
                  <th>Dueño</th>
                  <th>Historial</th>
                </tr>
              </thead>
                <tbody>
                {petData.map((pet, index) => (
                    <tr key={pet.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{pet.name}</td>
                    <td>{pet.species}</td>
                    <td>{pet.ownerId ? 'Cargando...' : 'Sin Dueño'}{/* Placeholder para el dueño */}</td>
                    <td>
                      <Button color="primary" onClick={() => handleButtonClick(pet.id)}>
                        Ver Tarjetas
                      </Button>
                    </td>
                  </tr>
                ))}                                
                </tbody>
            </Table>
              
          </CardBody>
        </Card>
      </Col>
      
    </Row>
  )};

export default Tables;
