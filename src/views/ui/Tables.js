import React from 'react';
import { Row, Col, Table, Card, CardTitle, CardBody, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom'; 

const Tables = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/historial'); // Redirige a la vista de tarjetas
  };

  // Datos de ejemplo para la tabla
  const petData = [
    { id: 1, name: 'Rex', species: 'Perro', owner: 'Juan', history: 'Consulta anual' },
    { id: 2, name: 'Mimi', species: 'Gato', owner: 'Ana', history: 'Vacunación' },
    { id: 3, name: 'Coco', species: 'Loro', owner: 'Luis', history: 'Chequeo' },
  ];
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
                    <td>{pet.owner}</td>
                    <td>
                    <Button color="primary" onClick={handleButtonClick}>
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
