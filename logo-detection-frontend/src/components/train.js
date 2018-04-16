import React from 'react';
import Footer from './footer.js';
import { searchImages } from 'pixabay-api';
import { Container,  Button, Form, FormGroup,  Input } from 'reactstrap';
import BrandImage from './brandImage.js'
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import './train.css';
import cookie from "react-cookies";

  export default class Train extends React.Component { 
    constructor(props) {
      super(props);
      this.state = { 
        pictures: [],
        token: cookie.load('token'),
        datasets: cookie.load('datasets'),
        datasetsElements: [],
        brand_name: '',
        images: [],
        loading: false
       };
       if (this.state.token === undefined) {
        this.props.history.push('/login');
        return;
      }
      console.log(this.state.datasets);
      
      
      // Image factory
      var createImage = function(src, title, id) {
        var img   = new Image();
        img.src   = src;
        img.alt   = title;
        img.title = title;
        img.id = id;
        return img; 
      };

      var elements = (this.state.datasets).split(',');
      this.state.datasetsElements = elements;
      console.log(elements);
      for (var i = 0; i < elements.length; i=i+3) {
        this.state.images.push(createImage(elements[i],elements[i+1], elements[i+2]));
      }
      var hist = this.props.history;
      var par = this;
      this.BrandNamesList = this.state.images.map(function(image, i){
        return <BrandImage history={hist} image={image} parent={par} key={i}/>;
      })
      this.onSubmit = this.onSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.refresh = this.refresh.bind(this);
      this.deleteDataSet = this.deleteDataSet.bind(this);
    }
    handleBrandNameChange = (e) => {
      this.setState({
        brand_name: e.target.value
      })
    }

    refresh() {
      fetch('http://localhost:2000/datasets/', {
        headers: {
          'Authorization': 'Bearer ' + this.state.token,
          'Content-Type': 'application/json',
        }
      }).then(response => 
        response.json())
      .then(json => {
        var data = json.datasets;
        var array = [];
        for(var i in data)
        {
          var name = data[i].name;
          var key = "datasetURL: " + name;
          var src = cookie.load(key);
          var id = data[i]._id;
          var data_set = [src, name, id];
          array.push(data_set);
        }
        var str = array.toString();
        cookie.save('datasets', str, { path: '/' , 'maxAge': 100000});
        window.location.reload();
      });
    }

    deleteDataSet (brand_name, id) {
        fetch('http://localhost:2000/datasets/' + id.toString(), {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + this.state.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then(response => {
        if (response.status === 200) {
          //good
          console.log("good");
        }
        else {
          //bad
        }
        this.refresh();
      });
    }

    onSubmit(ev) {
       const callRefresh = () => {
          this.refresh();
       }
        cookie.save('brandName', this.state.brand_name, { path: '/' , 'maxAge': 100000});
        fetch('http://localhost:2000/datasets', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + this.state.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": (this.state.brand_name).toLowerCase(),
          "datasetType": "0"
        })
      }).then(response => {
        var name =  (this.state.brand_name).toLowerCase();
        var url = "";
        let term = name.toString().toLowerCase();
        const AUTH_KEY = "8703238-5ba1c3ae204d8beb21f648965";
        searchImages(AUTH_KEY, term, {per_page: 5})
        .then((r) => {
          var imgArray = [];
          imgArray = r['hits'];
          if (imgArray.length == 0) {
            url = "https://www.iconsdb.com/icons/preview/caribbean-blue/database-5-xxl.png";
            var datasetName = "datasetURL: " + term;
            cookie.save(datasetName, url, { path: '/' , 'maxAge': 100000});
          }
          else {
            var imgSrc = imgArray[0]['largeImageURL'];
            var datasetName = "datasetURL: " + term;
            cookie.save(datasetName, imgSrc, { path: '/' , 'maxAge': 100000});
          }
        }
      );
      });


      
    }
    sleep(milliseconds) {
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
          break;
        }
      }
    }

    handleChange (brand_name, id) {
        cookie.save('brandName', brand_name, { path: '/' , 'maxAge': 100000});
        fetch('http://localhost:2000/datasets/'+ id +'/', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + this.state.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }).then(response => response.json())
        .then(json => {
          cookie.remove('imageJSONS');
          cookie.save('imageJSONS', json.images.slice(0,20), { path: '/' , 'maxAge': 100000});
          cookie.remove('currentDataSet');
          cookie.save('currentDataSet', id, { path: '/' , 'maxAge': 100000});
          this.props.history.push('/datasetlanding/' + brand_name.toLowerCase());
        });
    }

    render() {
      return (
        
      <Container>
        
      <Loading
                show={this.state.loading}
                color="red"
              />
          <center>
            <h5> See your datasets and create new ones </h5>
            <h5> Click on a dataset to delete it or to see the images it contains </h5>
            <div className="header-space"></div>

              <h5> CREATE A NEW DATA SET </h5>
              <Form>
                <FormGroup>
                  <Input 
                    type="datasetName" 
                    name="datasetName" 
                    id="datasetName"
                    placeholder="Dataset Name"  
                    value={this.state.brand_name}
                    onChange={this.handleBrandNameChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input 
                    type='file' 
                    label='Upload' 
                    accept='.jpeg, .png' 
                  />
                </FormGroup>
                  <Button onClick={this.onSubmit}>Add Data Set</Button>
              </Form>
              <div className="header-space"></div>
              <h5> YOUR DATA SETS </h5>
              <div className="box">
                  {this.BrandNamesList}
              </div>
              <div>
            </div>
          </center>
          <div className="header-space"></div>
          <Footer/>
      </Container>  
      );
    }
}