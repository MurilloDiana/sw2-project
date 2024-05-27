import React, { useState } from 'react';
import AppBa from '../../components/login/AppBa'; // Importación correcta
import Icon from '../../components/login/Icon';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica de inicio de sesión aquí
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div>
      <AppBa />
      <Container>
        <Row>
          <Col md={{ size: 6, offset: 3 }} className="text-center">
            <Icon /> {/* Usa el nuevo componente */}
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
                <Row>
                    <Col className="text-center">
                        <Button type="submit" color="primary" className="mt-3">Login</Button>
                    </Col>
                </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
    );
};

export default Login;
