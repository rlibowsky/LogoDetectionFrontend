import React from 'react';
import { Container, Button } from 'reactstrap';
import cookie from "react-cookies";


export default class FinishPage extends React.Component {
    constructor(props) {
        super(props);
        this.state =  { 
            token: cookie.load('token'),
            brandName: cookie.load('brandName')
        };
        this.handleGoBack = this.handleGoBack.bind(this);
    }

    handleGoBack () {
        this.props.history.push('/datasetlanding');
    }
    render () {   
        return(
            <Container>
                <center>
                <h1> Thanks for adding to the training set! </h1>
                <Button className="backButton" onClick={this.handleGoBack} > Go Back To {this.state.brandName} Data Set </Button>
                </center>
            </Container>
        );
    }
}