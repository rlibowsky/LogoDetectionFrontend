import React from 'react';
import Footer from './footer.js';
import { Container,  Button, Form, FormGroup,  Input } from 'reactstrap';
import ImagesUploader from 'react-images-uploader';
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import './train.css';
import cookie from "react-cookies";

  export default class Train extends React.Component { 
    constructor(props) {
      super(props);
      const imageClick = (brand_name, id) => {
        console.log("clicked image");
        this.handleChange(brand_name, id);
      }
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
            // Image factory
      var createImage = function(src, title, id) {
        var img   = new Image();
        img.src   = src;
        img.alt   = title;
        img.title = title;
        img.id = id;
        return img; 
      };
      // array of images
      // push two images to the array
      // images.push(createImage("http://1000logos.net/wp-content/uploads/2017/11/logo-Patagonia.jpg", "Patagonia"));
      // images.push(createImage("https://www.shopirvinecompany.com/media/8524/store-logo-lululemon.jpg", "Lululemon"));
      // images.push(createImage("https://seeklogo.com/images/A/adidas-logo-49D5BEBA90-seeklogo.com.png", "Adidas"));
      // images.push(createImage("http://1000logos.net/wp-content/uploads/2017/06/Logo-Under-Armour.jpg", "Under Armour"));
      // images.push(createImage("https://assets.lookbookspro.com/amanacliq/gm_5a29ffe2-7840-445e-bbaf-158fac11000a.jpg", "Converse"));

      console.log(this.state.datasets);

      var elements = (this.state.datasets).split(',');
      this.state.datasetsElements = elements;
      console.log(this.state.token)
      for (var i = 0; i < elements.length; i=i+3) {
        console.log("dataset " + elements[i]);
        this.state.images.push(createImage(elements[i],elements[i+1], elements[i+2]));
      }
      this.BrandNamesList = this.state.images.map(function(image, i){
        return <div className="dataSetBox" key = {image.title.toString()}> 
        <button> <img height="300px" width="300px" src={image.src.toString()} onClick={() => imageClick(image.title.toString(), image.id.toString())}/> {image.title.toString()}</button> 
        </div>;
      })
      this.onSubmit = this.onSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
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
          var src = data[i].src;
          var name = data[i].name;
          var id = data[i]._id;
          var data_set = [src, name, id];
          array.push(data_set);
        }
        var str = array.toString();
        cookie.save('datasets', str, { path: '/' , 'maxAge': 100000});
        window.location.reload();
      });
    }

    onSubmit(ev) {
        cookie.save('brandName', this.state.brand_name, { path: '/' , 'maxAge': 100000});
        console.log("BRAND NAME: " + this.state.brand_name)
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
        if (response.status === 200) {
          //good
        }
        else {
          //bad
        }
        this.refresh();
      });

    }

    handleChange (brand_name, id) {
      this.setState({
        loading: true
      })
        cookie.save('brandName', brand_name, { path: '/' , 'maxAge': 100000});
        fetch('http://localhost:2000/datasets/'+ id + '/scrape', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + this.state.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "hashtag": (brand_name).toLowerCase(),
          "image_count": "10"
        })
      }).then(response => response.json())
      .then(json => {
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