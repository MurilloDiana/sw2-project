import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

const DiagnosisModal = ({ isOpen, toggle, diagnosisData }) => {
    if (!diagnosisData) return null; // Si no hay datos, no renderiza nada
  
    return (
      <Modal isOpen={isOpen} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Diagnóstico de Paciente</ModalHeader>
        <ModalBody>
          <Table bordered>
            <tbody>
              <tr>
                <th>Paciente ID</th>
                <td>{diagnosisData.patientId}</td>
              </tr>
              <tr>
                <th>Doctor ID</th>
                <td>{diagnosisData.doctorId}</td>
              </tr>
              <tr>
                <th>Fecha</th>
                <td>{new Date(diagnosisData.date).toLocaleDateString()}</td>
              </tr>
              <tr>
                <th>Peso</th>
                <td>{diagnosisData.weight} kg</td>
              </tr>
              <tr>
                <th>Altura</th>
                <td>{diagnosisData.height} cm</td>
              </tr>
              <tr>
                <th>Temperatura</th>
                <td>{diagnosisData.temperature} °C</td>
              </tr>
              <tr>
                <th>Frecuencia Cardíaca</th>
                <td>{diagnosisData.heartRate} bpm</td>
              </tr>
              <tr>
                <th>Frecuencia Respiratoria</th>
                <td>{diagnosisData.respiratoryRate} bpm</td>
              </tr>
              <tr>
                <th>Diagnóstico</th>
                <td>{diagnosisData.diagnosis}</td>
              </tr>
              <tr>
                <th>Tratamiento</th>
                <td>{diagnosisData.treatment}</td>
              </tr>
              <tr>
                <th>Notas</th>
                <td>{diagnosisData.notes}</td>
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
  
  export default DiagnosisModal;