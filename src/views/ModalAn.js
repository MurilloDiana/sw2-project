import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import { useQuery } from '@apollo/client';
import { GET_ANALYSIS_BY_ID_PATIENT } from '../graphql/queries';

const ModalAnalisis = ({ isOpen, toggle, petId }) => {
  const { data, loading, error } = useQuery(GET_ANALYSIS_BY_ID_PATIENT, {
    variables: { id: petId },
  });

  // Extraer datos o manejar errores
  const analysisData = data?.getAnalysisByIdPatient || [];

  // Verificar si hay datos inválidos
  const hasInvalidData = analysisData.some(
    analysis => !analysis.patientId || !analysis.analysisType || !analysis.results
  );

  // Función para formatear la fecha
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

    // Si la conversión directa falla, intenta procesar el formato esperado
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

  // Renderizado del modal
  if (loading) return <p>Cargando análisis...</p>;

  if (error || hasInvalidData || analysisData.length === 0) {
    return (
      <Modal isOpen={isOpen} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Análisis de la Mascota</ModalHeader>
        <ModalBody>
          <p>No hay formulario disponible para los análisis de esta mascota.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cerrar</Button>
        </ModalFooter>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Análisis de la Mascota</ModalHeader>
      <ModalBody>
        <Table bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Tipo de Análisis</th>
              <th>Resultado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {analysisData.map((analysis, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{analysis.analysisType || 'N/A'}</td>
                <td>{analysis.results || 'N/A'}</td>
                <td>{formatDate(analysis.analysisDate)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cerrar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalAnalisis;