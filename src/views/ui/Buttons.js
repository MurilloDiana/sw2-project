import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const Buttons = () => {
  const [cSelected, setCSelected] = useState([]);
  const [rSelected, setRSelected] = useState(null);

  const onRadioBtnClick = (rSelected) => {
    setRSelected(rSelected);
  };

  const onCheckboxBtnClick = (selected) => {
    const index = cSelected.indexOf(selected);
    if (index < 0) {
      cSelected.push(selected);
    } else {
      cSelected.splice(index, 1);
    }
    setCSelected([...cSelected]);
  };

  return (
    <div>
      {/* --------------------------------------------------------------------------------*/}
      {/* Start Inner Div*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}
    {/*  <Row>
        <Col xs="12" md="6"> */ }  
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-1*/}
          {/* --------------------------------------------------------------------------------*/}
          {/*<Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Buttons
            </CardTitle>
            <CardBody className="">
              <div className="button-group">
                <Button className="btn" color="primary">
                  primary
                </Button>
                <Button className="btn" color="secondary">
                  secondary
                </Button>
                <Button className="btn" color="success">
                  success
                </Button>
                <Button className="btn" color="info">
                  info
                </Button>
                <Button className="btn" color="warning">
                  warning
                </Button>
                <Button className="btn" color="danger">
                  danger
                </Button>
                <Button className="btn" color="link">
                  link
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
          <Col xs="12" md="6">*/}
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-2*/}
          {/* --------------------------------------------------------------------------------*/}
         {/* <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Outline Buttons
            </CardTitle>
            <CardBody className="">
              <div className="button-group">
                <Button className="btn" outline color="primary">
                  primary
                </Button>
                <Button className="btn" outline color="secondary">
                  secondary
                </Button>
                <Button className="btn" outline color="success">
                  success
                </Button>
                <Button className="btn" outline color="info">
                  info
                </Button>
                <Button className="btn" outline color="warning">
                  warning
                </Button>
                <Button className="btn" outline color="danger">
                  danger
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" md="6">*/}
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-3*/}
          {/* --------------------------------------------------------------------------------*/}
          {/*<Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Large Size Buttons
            </CardTitle>
            <CardBody className="">
              <div className="button-group">
                <Button className="btn" color="primary" size="lg">
                  Large Button
                </Button>
                <Button className="btn" color="secondary" size="lg">
                  Large Button
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" md="6">*/}
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-4*/}
          {/* --------------------------------------------------------------------------------*/}
          {/*<Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Small Size Buttons
            </CardTitle>
            <CardBody className="">
              <div className="button-group">
                <Button className="btn" color="primary" size="sm">
                  Small Button
                </Button>
                <Button className="btn" color="secondary" size="sm">
                  Small Button
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" md="6">*/}
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-6*/}
          {/* --------------------------------------------------------------------------------*/}
          {/*<Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Active State Buttons
            </CardTitle>
            <CardBody className="">
              <div className="button-group">
                <Button className="btn" color="primary" size="lg" active>
                  Primary link
                </Button>
                <Button className="btn" color="secondary" size="lg" active>
                  Link
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" md="6">*/}
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-7*/}
          {/* --------------------------------------------------------------------------------*/}
        
    </div>
  );
};

export default Buttons;
