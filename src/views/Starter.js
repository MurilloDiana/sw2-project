import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import PetsChart from "../components/dashboard/PetsChart";
import AppointmentsChart from "../components/dashboard/AppointmentsChart";
import TopCards from "../components/dashboard/TopCards";
import PetsChartPie from "../components/dashboard/PetsChartPie";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";



const Starter = () => {
  
  return (
    <div>
      {/***Top Cards***/}
      
      {/***Sales & Feed***/}
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <SalesChart />
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
        <PetsChartPie />
        </Col>
      </Row>
      {/***Table ***/}
      <Row>
        <Col lg="12">
        <PetsChart />
        </Col>
      </Row>
      {/***Blog Cards***/}
      <Row>
      <AppointmentsChart />
      </Row>
    </div>
  );
};

export default Starter;
