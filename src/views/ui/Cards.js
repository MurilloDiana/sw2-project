import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardGroup,
  Button,
  Row,
  Col,
} from "reactstrap";
import { useParams } from "react-router-dom"; 
import Blog from "../../components/dashboard/Blog";
//import bg1 from "../../assets/images/bg/bg1.jpg";
import bg2 from "../../assets/images/test-tube.png";
import bg3 from "../../assets/images/injection.png";
import bg4 from "../../assets/images/analysis.png";
import  bg5 from "../../assets/images/visite.png";
import VacModal from "../ModalVac";
import AnModal from "../ModalAn";
import DiagModal from "../ModalDiag";
import VisitsModal from "../ModalVisit";

const BlogData = [
  {
    image: bg4,
    title: "Analisis de la mascota",
    //subtitle: "2 comments, 1 Like",
    description:
      "Es un control de los analisis que se receto al paciente para determinar un tratamiento.",
    btnbg: "primary",
    modalType:'analysis'
  },
  {
    image: bg3,
    title: "Control de Vacunas",
    //subtitle: "2 comments, 1 Like",
    description:
      "Nos proporcionara una vista de las vacunas que el paciente se le puso en el transcurso del tiempo.",
    btnbg: "primary",
    modalType:'vaccination',
  },
  {
    image: bg2,
    title: "Diagnosticos",
    //subtitle: "2 comments, 1 Like",
    description:
      "Se presentara una descripcion de los diagnosticos que se hizo a una mascota.",
    btnbg: "primary",
    modalType: 'diagnosis',
  },
  {
    image: bg5,
    title: "Visitas",
    //subtitle: "2 comments, 1 Like",
    description:
      "Se mantiene un orden de las visitas que se tienen del paciente.",
    btnbg: "primary",
    modalType: 'visite',
  },
];

const Cards = () => {
  const { id } = useParams(); // Obtener el ID de la mascota desde la URL
  const [isVacunaModelOpen,setVacunaModelOpen] =useState(false);
  const [isAnalisiModalOpen,setAnalisiModalOpen] =useState(false);
  const [isDiagnosticModalOpen,setDiagnosticModalOpen] =useState(false);
  const [isVisitModalOpen,setVisitModalOpen] =useState(false);

  const toggleVacunaModel = () => setVacunaModelOpen(!isVacunaModelOpen);
  const toggleAnalysisModal =()=> setAnalisiModalOpen(!isAnalisiModalOpen);
  const toggleDiagnosisModal =()=> setDiagnosticModalOpen(!isDiagnosticModalOpen);
  const toggleVisitModal =()=> setVisitModalOpen(!isVisitModalOpen);

  const handleButtonClick = (modalType) => {
    switch (modalType) {
      case 'analysis':
        toggleAnalysisModal();
        break;
      case 'vaccination':
        toggleVacunaModel();
        break;
      case 'diagnosis':
        toggleDiagnosisModal();
        break;
      case 'visite':
        toggleVisitModal();
        break;
      default:
        break;
    }
  };
  
  return (
    <div>
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-1*/}
      {/* --------------------------------------------------------------------------------*/}
      <h3 className="mb-3">Historial Clinico</h3>
      <h5 className="mb-3">Tarjetas Mascotas</h5>
      <Row>
        {BlogData.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
           <Card>
              <CardImg top width="100%" src={blg.image} alt={blg.title} />
              <CardBody>
                <CardTitle tag="h5">{blg.title}</CardTitle>
                <CardText>{blg.description}</CardText>
                <Button color={blg.btnbg} onClick={() => handleButtonClick(blg.modalType)}>Ver Más</Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      <VacModal isOpen={isVacunaModelOpen} toggle={toggleVacunaModel} petId={id}/>
      <AnModal isOpen={isAnalisiModalOpen} toggle={toggleAnalysisModal} petId={id}/>
      <DiagModal isOpen={isDiagnosticModalOpen} toggle={toggleDiagnosisModal} petId={id}/>
      <VisitsModal isOpen={isVisitModalOpen} toggle={toggleVisitModal} petId={id}/>
     </div>
  );
};

export default Cards;