import React from 'react';
import { Container, Button, Form, FormGroup, Input } from 'reactstrap';

export default class SignUp extends React.Component {
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
    <Container >
        <center class="credentialContainer">
            <h2> Sign Up </h2>
    <Form>
        <FormGroup>
          <Input type="email" name="email" placeholder="Email" />
        </FormGroup>
        <FormGroup>
          <Input type="password" name="password" id="password" placeholder="Password" />
        </FormGroup>
        <FormGroup>
          <Input type="password" name="passwordVerify" id="passwordVerify" placeholder="Retype Password" />
        </FormGroup>
        <Button onClick={this.onSubmit}> Go </Button>
        <div class="switchText" > Already have an account? </div>
        <a class="switchLink" href="/login"> Log In </a>
      </Form>
      </center>
    </Container>
    );
  }
}