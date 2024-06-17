import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap';
import DoctorSelect from './DoctorSelect';
import { useMutation } from '@apollo/client';
import { CREATE_ANALYSIS, CREATE_VACCINE, CREATE_CONSULTATIONS ,UPDATE_VISITS} from '../graphql/queries';

const AsignacionMedicamentosModal = ({ isOpen, toggle, atencion , onUpdateStatus }) => {
  const [fechaP, setFechaP] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  /* Variables para vacunas */
  const [nombre_v, setNombre_v] = useState('');
  const [fechaV, setFechaV] = useState('');
  const [dosis_v, setDosis_v] = useState('');
  /* Variables para análisis */
  const [nom_an, setNom_an] = useState('');
  const [fechaA, setFechaA] = useState('');
  const [descr_a, setDesc_a] = useState('');
  const [res_a, setRes_a] = useState('');
  /* Variables para observaciones */
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [frecCora, setFrecCora] = useState('');
  const [frecResp, setFrecResp] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [tratam, setTratam] = useState('');

  const handleDoctorChange = (selectedOption) => {
    setSelectedDoctor(selectedOption);
  };
  
  const formatDateForBackend = (date) => {
    const d = new Date(date);
    return d.toISOString(); // This gives the full ISO string with timezone.
  };
  

  const [createAnalysis] = useMutation(CREATE_ANALYSIS);
  const [createVaccine] = useMutation(CREATE_VACCINE);
  const [createConsultations] = useMutation(CREATE_CONSULTATIONS);
  const [updateVisit] = useMutation(UPDATE_VISITS);

  const handleSave = async () => {
    try {
     // Formatear las fechas
      //const formattedFechaA = formatDateForBackend(fechaA);
      const formattedFechaA = new Date(fechaA).toISOString();
      const formattedFechaP = new Date(fechaP).toISOString();
      const formattedFechaV = new Date(fechaV).toISOString();
      const formattedFechaD = new Date(fechaP).toISOString();
      console.log(selectedDoctor?.value);
      console.log(formattedFechaP);
      console.log(formattedFechaV);
      await createAnalysis({
        variables: {
          analysisRequest: {
            patientId: atencion.idPatient,
            analysisType: nom_an,
            results: res_a,
            analysisDate: formattedFechaA,
            notes: descr_a,
          },
        },
      });

      await createVaccine({
        variables: {
          vaccineRequest: {
            patientId: atencion.idPatient,
            vaccineName: nombre_v,
            administeredDate: formattedFechaD,
            nextAdministeredDate: formattedFechaV,
            doses: parseInt(dosis_v, 10),
          },
        },
      });

      await createConsultations({
        variables: {
          consultationsRequest: {
            patientId: atencion.idPatient,
            doctorId: selectedDoctor?.value,
            date: formattedFechaP,
            weight: parseFloat(peso),
            height: parseInt(altura, 10),
            temperature: parseFloat(temperatura),
            heartRate: parseInt(frecCora, 10),
            respiratoryRate: parseInt(frecResp, 10),
            diagnosis: diagnosis,
            treatment: tratam,
          },
        },
      });

          // Actualizar el estado de la visita a "Atendido"
          await updateVisit({
            variables: {
              id: atencion.id,
              status: 'Atendido',
            },
          });

      console.log('Datos guardados correctamente');
      onUpdateStatus(atencion.id, 'Atendido');
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
      }
      if (error.networkError) {
        console.log(`[Network error]: ${error.networkError}`);
      }
    }
    toggle();
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
          <Label for="observaciones">Observaciones Generales</Label> <br />
          <Label for="altura">Altura</Label>
          <Input type="text" id="height" value={altura} onChange={(e) => setAltura(e.target.value)} />
          <br /><Label for="peso">Peso</Label>
          <Input type="text" id="weight" value={peso} onChange={(e) => setPeso(e.target.value)} />
          <br /><Label for="temperatura">Temperatura</Label>
          <Input type="text" id="temperature" value={temperatura} onChange={(e) => setTemperatura(e.target.value)} />
          <br /><Label for="frecCora">Ritmo Cardiaco</Label>
          <Input type="text" id="heartrate" value={frecCora} onChange={(e) => setFrecCora(e.target.value)} />
          <br /><Label for="frecResp">Frecuencia Respiratoria</Label>
          <Input type="text" id="respiratoryrate" value={frecResp} onChange={(e) => setFrecResp(e.target.value)} />
          <br /><Label for="diagnosis">Diagnostico</Label>
          <Input type="text" id="diagnosis" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} />
          <br /><Label for="tratam">Tratamientos</Label>
          <Input type="text" id="tratam" value={tratam} onChange={(e) => setTratam(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="vacunas">Vacunas</Label>
          <br /><Label for="nombre_v">Nombre</Label>
          <Input type="text" id="nombre_v" value={nombre_v} onChange={(e) => setNombre_v(e.target.value)} />
          <br /><Label for="dosis_v">Dosis</Label>
          <Input type="text" id="dosis_v" value={dosis_v} onChange={(e) => setDosis_v(e.target.value)} />
          <br /><Label for="fechaV">Fecha próxima vacuna:</Label>
          <Input type="date" id="fechaV" value={fechaV} onChange={(e) => setFechaV(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="analisis">Análisis</Label>
          <br /><Label for="fechaA">Fecha del análisis</Label>
          <Input type="date" id="fechaA" value={fechaA} onChange={(e) => setFechaA(e.target.value)} />
          <br /><Label for="nom_an">Nombre</Label>
          <Input type="text" id="nom_an" value={nom_an} onChange={(e) => setNom_an(e.target.value)} />
          <br /><Label for="descr_a">Descripción</Label>
          <Input type="text" id="descr_a" value={descr_a} onChange={(e) => setDesc_a(e.target.value)} />
          <br /><Label for="res_a">Resultado</Label>
          <Input type="text" id="res_a" value={res_a} onChange={(e) => setRes_a(e.target.value)} />
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
