import React from 'react';
import { Container, Button, Form, FormGroup, Input } from 'reactstrap';
import './signup.css';
import cookie from "react-cookies";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordVerify: '',
      name: '',
      organization: '',
      error: '',
      data: '',
      token: cookie.load('token')
    }
    this.clearForm = this.clearForm.bind(this);
    this.login = this.login.bind(this);
  }

  clearForm(errorStr) {
    document.getElementById("email").value="";
    document.getElementById("password").value="";
    document.getElementById("passwordVerify").value="";
    document.getElementById("name").value="";
    document.getElementById("organization").value="";
    this.setState({
      email: '',
      password: '',
      passwordVerify: '',
      name: '',
      organization: '',
      error: errorStr,
      data: ''
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
  handlePasswordVerifyChange = (e) => {
    this.setState({
      passwordVerify: e.target.value
    })
  }
  handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  handleOrganizationChange = (e) => {
    this.setState({
      organization: e.target.value
    })
  }

  login(email, password) {
    fetch('http://localhost:2000/users/login/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    }).then(response => {
      console.log(response.json);
      if (response.status === 200) {
        response.json().then(json => {
          this.state.wrongLogin = false;
          cookie.save('token', json.token, { path: '/' , 'maxAge': 100000});
          this.props.history.push('/portal');
        });
      }
      else {
      }
    }) 
  }

  handleSubmit = (e) => {
    if (this.state.password !== this.state.passwordVerify){
      this.clearForm("passwords don't match");
      return;
    }
    e.preventDefault();
    fetch('http://localhost:2000/users/signup/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": this.state.email,
        "password": this.state.password,
        "name": this.state.name,
        "organization": this.state.organization
      })
    }).then(response => {
      console.log(response.status)
      if (response.status === 201) {
        response.json().then(json => {
          this.login(this.state.email, this.state.password);
      });
      }
      else if (response.status === 409) {
        this.clearForm('User already registered');
      }
      else {
        this.clearForm('Fields not entered correctly');
      }
    }).then(data => {
      this.setState({data: data });
  });  
  }

  render() {
    return (
    <Container >
        <center className="credentialContainer">
            <h2> Sign Up </h2>
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
        <FormGroup>
          <Input 
            type="password" 
            name="passwordVerify" 
            id="passwordVerify" 
            placeholder="Retype Password" 
            value={this.state.passwordVerify}
            onChange={this.handlePasswordVerifyChange}
          />
        </FormGroup>
        <FormGroup>
          <Input 
            type="name" 
            name="name" 
            id="name" 
            placeholder="Full Name" 
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </FormGroup>
        
        <FormGroup>
          <Input 
            type="organization" 
            name="organization" 
            id="organization" 
            placeholder="Organization" 
            value={this.state.organization}
            onChange={this.handleOrganizationChange}
          />
        </FormGroup>
        <div>
          <h5 className="errorText">
            {this.state.error}
          </h5>
        </div>
        <Button onClick={this.handleSubmit}> Go </Button>
        <div className="switchText" > Already have an account? </div>
        <a className="switchLink" href="/login"> Log In </a>
      </Form>
      </center>
    </Container>
    );
  }
}