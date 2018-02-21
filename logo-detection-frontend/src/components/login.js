import React from 'react';
import { Container,  Button, Form, FormGroup,  Input } from 'reactstrap';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      data: '',
      wrongLogin: false
    }
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value
    })
  }
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.email)
    console.log(this.state.password)
    fetch('http://localhost:2000/users/login/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": this.state.email,
        "password": this.state.password,
      })
    }).then(response => {
      console.log(response.status)
      if (response.status == 200) {
        this.state.wrongLogin = false;
        this.props.history.push('/portal');
      }
      else {
        this.state.wrongLogin = true;
      }
    }).then(data => {
      this.setState({data: data })
  });  
  }

  render() {
    return (
    <Container>
        <center class="credentialContainer">
            <h1> Login </h1>
    <Form>
        <FormGroup>
          <Input 
            type="email" 
            name="email" 
            placeholder="Email"  
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
        </FormGroup>
        <FormGroup>
          <Input 
            type="password" 
            name="password" 
            id="password" 
            placeholder="Password" 
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </FormGroup>

        <div> 
              {this.state.wrongLogin ? (
              <h5> incorrect password </h5>
            ) : (
              <h5> </h5>
            )}
        </div>

        <FormGroup>
            <div class="switchCheckBox"> 
              <Input addon type="checkbox"/> 
              Remember Me
            </div>
            <a class="switchLinkRight" href="/"> Forgot Password? </a>
        </FormGroup>
        <Button onClick={this.handleSubmit} >Go</Button>
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