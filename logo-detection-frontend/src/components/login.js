import React from 'react';
import { Container,  Button, Form, FormGroup,  Input } from 'reactstrap';
import './login.css';
import Header from './header.js';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      data: '',
      wrongLogin: false
    }
    this.clearForm = this.clearForm.bind(this);
  }

  clearForm(wrongLoginVal) {
    document.getElementById("email").value="";
    document.getElementById("password").value="";
    this.setState({
      email: '',
      password: '',
      data: '',
      wrongLogin: wrongLoginVal
    });
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
      if (response.status === 200) {
        this.state.wrongLogin = false;
        this.props.history.push({
          pathname: '/portal',
          params: {
            email: this.state.email
          }
        });
      }
      else {
        this.clearForm(true);
      }
    }).then(data => {
      this.setState({data: data })
  });  
  }

  render() {
    return (
    <Container>
      <Header {...this.props}/>
        <center className="credentialContainer">
            <h1> Login </h1>
    <Form>
        <FormGroup>
          <Input 
            type="email" 
            name="email" 
            id="email"
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
              <h5 className="errorText"> Invalid username or password </h5>
            ) : (
              <h5> </h5>
            )}
        </div>

        <FormGroup>
            <div className="switchCheckBox"> 
              <Input addon type="checkbox"/> 
              Remember Me
            </div>
            <a className="switchLinkRight" href="/"> Forgot Password? </a>
        </FormGroup>
        <Button onClick={this.handleSubmit} >Go</Button>
        <FormGroup>
            <div className="switchText"> Don't have an account? </div>
            <a className="switchLink" href="/signup"> Sign up </a>
        </FormGroup>
      </Form>
      </center>
    </Container>
    );
  }
}