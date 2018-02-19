import React from 'react';
import { Container, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(ev) {
    /* TODO: send email to LogoDetect */
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
        <Input className="inline" type="email" name="email" required="true" placeholder="Email *" />
          </FormGroup>
        
        <FormGroup>
            <Input type="string" name="subject" placeholder="Subject" />
        </FormGroup>
        <FormGroup>
            <Input type="string" name="message" placeholder="Message" />
        </FormGroup>
        <Button onClick={this.onSubmit} >Send </Button>
      </Form>
      </center>
    </Container>
    );
  }
}