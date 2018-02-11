import React from 'react';
import { Container, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class SignUp extends React.Component { 

  render() {
    return (
    <Container>
        <center>
            <h2> Sign Up </h2>
    <Form>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" placeholder="Email" />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" placeholder="Password" />
        </FormGroup>
        <FormGroup>
          <Label for="password">Retype Password</Label>
          <Input type="password" name="passwordVerify" id="passwordVerify" placeholder="Retype Password" />
        </FormGroup>
        <Button>Go</Button>
        <FormGroup>
            <div> Already have an account? </div>
            <a href="/signup"> Sign up </a>
        </FormGroup>
      </Form>
      </center>
    </Container>
    );
  }
}