import { Badge, Table,Button, Card, CardBody, CardTitle, Row, Col } from "reactstrap";

const Atencion = () => {
  return (
    <div>
    <h2>Atencion del Dia</h2>
    <h3>01/06/2024</h3>
    <Card>
      <CardBody>
        <Button color="danger" style={{ marginRight: '10px' }} >Crear Ficha de Atencion</Button> 
      
      </CardBody>
    </Card>
        <Card>
          <CardBody>
          <CardTitle>
              <h4>Listado de Atencion Diaria</h4>
          </CardTitle>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre Mascota</th>
                <th>Fecha de Atencion</th>
                <th>Descripcion</th>
                <th>Dueño</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Perro</td>
                <td>2021-09-25</td>
                <td>Consulta</td>
                <td>Carlos</td>
                <td>Reservado</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Gato</td>
                <td>2021-09-25</td>
                <td>Vacunacion</td>
                <td>Carlos</td>
                <td>Reservado</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Perro</td>
                <td>2021-09-25</td>
                <td>Consulta</td>
                <td>Carlos</td>
                <td>Reservado</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Gato</td>
                <td>2021-09-25</td>
                <td>Vacunacion</td>
                <td>Carlos</td>
                <td>Reservado</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Perro</td>
                <td>2021-09-25</td>
                <td>Consulta</td>
                <td>Carlos</td>
                <td>Reservado</td>
              </tr>
            </tbody>
          </Table>
          </CardBody>
        </Card>
            </div>
  );
};

export default Atencion;
