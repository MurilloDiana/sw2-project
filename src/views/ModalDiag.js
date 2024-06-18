import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import { useQuery } from '@apollo/client';
import { GET_CONSULTATIONS_BY_ID_PATIENT } from '../graphql/queries';

const formatDate = (dateString) => {
  if (!dateString) return 'Fecha inválida';

  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  // Handle dates in the format "Sun Jun 16 00:00:00 VET 2024"
  const parts = dateString.split(' ');
  if (parts.length === 6) {
    const [dayName, monthName, day, time, zone, year] = parts;
    const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(monthName);
    if (monthIndex !== -1) {
      const isoDateString = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${day}`;
      const parsedDate = new Date(isoDateString);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
      }
    }
  }

  return 'Fecha inválida';
};

const DiagnosisModal = ({ isOpen, toggle, petId }) => {
  const { data, loading, error } = useQuery(GET_CONSULTATIONS_BY_ID_PATIENT, {
    variables: { id: petId },
  });

  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);

  if (loading) return <p>Cargando diagnósticos...</p>;
  if (error) return <p>Error al cargar los diagnósticos: {error.message}</p>;

  const diagnosisData = data?.getConsultationsByIdPatient || [];

  const handleDiagnosisSelect = (index) => {
    setSelectedDiagnosis(diagnosisData[index]);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Diagnóstico de Paciente</ModalHeader>
      <ModalBody>
        <Table bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Fecha</th>
              <th>Diagnóstico</th>
              <th>Tratamiento</th>
            </tr>
          </thead>
          <tbody>
            {diagnosisData.map((diagnosis, index) => (
              <tr key={index} onClick={() => handleDiagnosisSelect(index)}>
                <th scope="row">{index + 1}</th>
                <td>{formatDate(diagnosis.date)}</td>
                <td>{diagnosis.diagnosis}</td>
                <td>{diagnosis.treatment}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {selectedDiagnosis && (
          <div>
            <h5>Detalles del Diagnóstico</h5>
            <Table bordered>
              <tbody>
                <tr>
                  <th>Paciente ID</th>
                  <td>{selectedDiagnosis.patientId}</td>
                </tr>
                <tr>
                  <th>Doctor ID</th>
                  <td>{selectedDiagnosis.doctorId}</td>
                </tr>
                <tr>
                  <th>Fecha</th>
                  <td>{formatDate(selectedDiagnosis.date)}</td>
                </tr>
                <tr>
                  <th>Peso</th>
                  <td>{selectedDiagnosis.weight} kg</td>
                </tr>
                <tr>
                  <th>Altura</th>
                  <td>{selectedDiagnosis.height} cm</td>
                </tr>
                <tr>
                  <th>Temperatura</th>
                  <td>{selectedDiagnosis.temperature} °C</td>
                </tr>
                <tr>
                  <th>Frecuencia Cardíaca</th>
                  <td>{selectedDiagnosis.heartRate} bpm</td>
                </tr>
                <tr>
                  <th>Frecuencia Respiratoria</th>
                  <td>{selectedDiagnosis.respiratoryRate} bpm</td>
                </tr>
                <tr>
                  <th>Diagnóstico</th>
                  <td>{selectedDiagnosis.diagnosis}</td>
                </tr>
                <tr>
                  <th>Tratamiento</th>
                  <td>{selectedDiagnosis.treatment}</td>
                </tr>
                <tr>
                  <th>Notas</th>
                  <td>{selectedDiagnosis.notes || 'No hay notas adicionales'}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cerrar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default DiagnosisModal;