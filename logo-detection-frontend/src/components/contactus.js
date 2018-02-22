import React from 'react';
import { Container, Button, Form, FormGroup, Input } from 'reactstrap';

export default class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(ev) {
    document.getElementById("name").value="";
    document.getElementById("email").value="";
    document.getElementById("subject").value="";
    document.getElementById("message").value="";
  }

  render() {
    return (
    <Container>
        <center>
            <h1> CONTACT US </h1>
            <h5> LogoDetect is committed to exceeding your needs. Questions, comments or special requests? We’d </h5>
            <h5> love to hear from you, so don’t hesitate in reaching out today. </h5>
    <Form>
    <FormGroup>
          <Input type="string" name="name" id="name" required="true" placeholder="Name *" />
          
        </FormGroup>
        <FormGroup>
        <Input className="inline" id="email" type="email" name="email" required="true" placeholder="Email *" />

          </FormGroup>
        
        <FormGroup>
            <Input type="string" id="subject" name="subject" placeholder="Subject" />
        </FormGroup>
        <FormGroup>
            <Input type="string" id="message" name="message" placeholder="Message" />
        </FormGroup>
        <Button onClick={this.onSubmit}> Send </Button>
      </Form>
      </center>
    </Container>
    );
  }
}