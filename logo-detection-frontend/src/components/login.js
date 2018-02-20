import React from 'react';
import { Container,  Button, Form, FormGroup,  Input } from 'reactstrap';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(ev) {
    this.props.history.push('/portal');
    /* TODO: validate the data */
    console.log("here")
    fetch('http://localhost:2000/users/signup/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "email": "testing@gmail.com",
            "password": "secret",
            "name": "matthew",
            "organization": "Apple"
          })
    }).then(function(response) {
     return response.json();
    }).then(function(data) {
      console.log(data)
     });
  }

  render() {
    return (
    <Container>
        <center class="credentialContainer">
            <h1> Login </h1>
    <Form>
        <FormGroup>
          <Input type="email" name="email" placeholder="Email" />
        </FormGroup>
        <FormGroup>
          <Input type="password" name="password" id="password" placeholder="Password" />
        </FormGroup>
        <FormGroup>
            <div class="switchCheckBox"> 
              <Input addon type="checkbox"/> 
              Remember Me
            </div>
            <a class="switchLinkRight" href="/"> Forgot Password? </a>
        </FormGroup>
        <Button onClick={this.onSubmit} >Go</Button>
        <FormGroup>
            <div class="switchText"> Don't have an account? </div>
            <a class="switchLink" href="/signup"> Sign up </a>
        </FormGroup>
      </Form>
      </center>
    </Container>
    );
  }
}