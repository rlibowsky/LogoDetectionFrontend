import React from 'react';
import Footer from './footer.js';
import { Container,  Button, Form, FormGroup,  Input } from 'reactstrap';
import BrandImage from './brandImage.js'
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import './dataSetProgress.css';
import cookie from "react-cookies";

  export default class DataSetProgress extends React.Component { 
    constructor(props) {
      super(props);
      this.state = { 
        token: cookie.load('token'),
        datasets: cookie.load('datasets'),
        datasetsElements: [],
        loading: false,
       };
       if (this.state.token === undefined) {
        this.props.history.push('/login');
        return;
      }
      this.getDataSetInfo = this.getDataSetInfo.bind(this);
      this.createDisplay = this.createDisplay.bind(this);
      this.getDataSetInfo();
    }

    getDataSetInfo() {
        // get datasets
        fetch('http://localhost:2000/datasets/', {
        headers: {
          'Authorization': 'Bearer ' + this.state.token,
          'Content-Type': 'application/json',
        }
      }).then(response => 
        response.json())
      .then(json => {
          console.log("got response from dataset fetch");
          console.log(json);
        var data = json.datasets;
        var array = [];
        for(var i in data)
        {
          var cover = data[i].cover;
          var name = data[i].name;
          var id = data[i]._id;
          var status = data[i].status;
          var data_set = {
              cover: cover, 
              name: name,
              id: id, 
              status: status
        };
          array.push(data_set);
        }
        this.setState({
            dataSetElements: array
        });
        this.createDisplay();
      });
    }

    createDisplay() {
        const seeDataset = (dataset) => {
            // return;
            console.log("id is " + dataset.id);
            // this.setState({
            //     loading: true
            // })
            // var arr = [];
            fetch('http://localhost:2000/datasets/results/6', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.state.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            })
            .then(response => response.json() )
            .then(json => {
                console.log("json is ");
                console.log(json.datasets);
                for (var i = 0; i < json.datasets.length; i++) {
                    if (json.datasets[i].datasetId === dataset.id) {
                        var images = json.datasets[i].images;
                        console.log("images is " );
                        console.log(images);
                        cookie.save('brandName', dataset.name, { path: '/' , 'maxAge': 100000});
                        cookie.save('imagesWithContexts', images.slice(0,10), { path: '/' , 'maxAge': 100000});
                        this.props.history.push('/datasetcontext/' + dataset.name.toLowerCase());
                        break;
                    }
                }
            // var imageArray = data['images'];
            // cookie.save('brandName', dataset.name, { path: '/' , 'maxAge': 100000});
            // cookie.remove('imageJSONS');
            // cookie.save('imageJSONS', imageArray.slice(0,20), { path: '/' , 'maxAge': 100000});
            // cookie.remove('currentDataSet');
            // cookie.save('currentDataSet', dataset.id, { path: '/' , 'maxAge': 100000});
            // this.props.history.push('/datasetcontext/' + dataset.name.toLowerCase());
            });
        }
        this.dataSetInfo = this.state.dataSetElements.map(function(dataset){
            var status = dataset.status;
            var statusText;
            switch(status) {
                case 0:
                    statusText = "Created";
                    break;
                case 1:
                    statusText = "Ready to be Trained";
                    break;
                case 2:
                    statusText = "Training";
                    break;
                case 3:
                    statusText = "Finished Training";
                    break;
                case 4:
                    statusText = "Ready to be Classified";
                    break;
                case 5:
                    statusText = "Classifying";
                    break;
                case 6:
                    statusText = "Finished Classifying";
                    break;
                default: 
                    statusText = "Training";
                    break;
            }
            return(
                <div className="dataSet" key={dataset.id.toString()}>
                    <div> <Button className="datasetButton" onClick={() => seeDataset(dataset)} > { dataset.name }  </Button> </div>
                    <div className="statusNum" >  Status: { statusText }</div>
                </div>
            );
          })
        this.forceUpdate();
    }

    render() {
        console.log(
            "in render"
        );
        console.log(this.dataSetInfo);
      return (
      <Container>
      <Loading
                show={this.state.loading}
                color="red"
              />
          <center>
            
              {/* <h3> DATA SET PROGRESS </h3> */}
              <h5> See the status of the datasets you've created</h5>
              <h5> If a dataset is done classifying, click on it to see the image contexts</h5>
              {/* <h5> Click on a data set to learn more about the images it contains</h5> */}
              <div className="header-space"></div>
              <li> { this.dataSetInfo } </li>
          
          </center>
          <div className="header-space"></div>
          <Footer/>
      </Container>  
      );
    }
}