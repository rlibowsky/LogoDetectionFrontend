import React from 'react';
import { Container,  Button, Form, FormGroup,  Input } from 'reactstrap';
import cookie from "react-cookies";

export default class TrianResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: cookie.load('token')
    }
    this.onDone = this.onDone.bind(this);
  }

  onDone() {

  }

  render() {
    return (
    <Container>
        <center>
            <h1> RESULTS </h1>
    <Form>
        {/* <FormGroup>
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
              <h5 className="errorText"> {this.state.wrongLogin} </h5>
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
        </FormGroup> */}
      </Form>
      </center>
    </Container>
    );
  }
}