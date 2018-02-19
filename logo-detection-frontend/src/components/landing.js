import React from 'react';
import MeetTheTeam from './meettheteam.js';
import ContactUs from './contactus.js';
import Map from './map.js';
import { Container, Row, Col, Table } from 'reactstrap';
import './landing.css';



const Landing = () => {
    return(
        <Container>
            <center>
            <h1> WELCOME TO LOGODETECT </h1>
            <h5> Give us your logo and we will tell you the best way to attract new customers.</h5>
            <h5> Yes, it is that simple. </h5>
            <img src={require('./images/landingpage/logodetectlandingpagelamps.png')} width="100%" alt="lamps"/>
            <p>
            <h1> ABOUT LOGODETECT </h1>
            <h5> Our company gives you insight on your brand's impact by detecting logos in images shared on </h5>
            <h5> Instagram. From our detailed and thorough machine learning algorithm, our platform will provide you  </h5>
            <h5>with accurate results regarding where and who to sell your brand to.</h5>
            </p>
            <img src={require('./images/landingpage/logodetectlandingpagehands.png')} width="100%" alt="hands"/>
            <h1> MEET OUR TEAM </h1>
            <div>
            <MeetTheTeam />
            </div>
            <Map height="100%" width="100%"/>
            <ContactUs />

            </center>
        </Container>
    );
};

export default Landing;