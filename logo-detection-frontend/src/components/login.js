import React from 'react';
import { Container, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(ev) {
    this.props.history.push('/portal');
    /* TODO: validate the data */
  }

  render() {
    return (
    <Container>
        <center>
            <h1> Login </h1>
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
            <a href="/"> Forgot Password? </a>
        </FormGroup>
        <Button onClick={this.onSubmit} >Go</Button>
        <FormGroup>
            <div> Don't have an account? </div>
            <a href="/signup"> Sign up </a>
        </FormGroup>
      </Form>
      </center>
    </Container>
    );
  }
}