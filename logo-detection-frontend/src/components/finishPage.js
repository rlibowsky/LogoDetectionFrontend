import React from 'react';
import { Container } from 'reactstrap';
import cookie from "react-cookies";


export default class FinishPage extends React.Component {
    constructor(props) {
        super(props);
        this.state =  { token: cookie.load('token') };
    }
    render () {   
        return(
            <Container>
                <center>
                <h1> Thanks for adding to the training set! </h1>
                </center>
            </Container>
        );
    }
}