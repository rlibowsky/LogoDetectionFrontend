import React from 'react';
import Footer from './footer.js';
import { Container, Button } from 'reactstrap';
import ImagesUploader from 'react-images-uploader';
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
        brand_name: '',
        logoName: ''
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
      var images = [];
      // push two images to the array
      // images.push(createImage("http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png", "Nike"));
      // images.push(createImage("http://1000logos.net/wp-content/uploads/2017/11/logo-Patagonia.jpg", "Patagonia"));
      // images.push(createImage("https://www.shopirvinecompany.com/media/8524/store-logo-lululemon.jpg", "Lululemon"));
      // images.push(createImage("https://seeklogo.com/images/A/adidas-logo-49D5BEBA90-seeklogo.com.png", "Adidas"));
      // images.push(createImage("http://1000logos.net/wp-content/uploads/2017/06/Logo-Under-Armour.jpg", "Under Armour"));
      // images.push(createImage("https://assets.lookbookspro.com/amanacliq/gm_5a29ffe2-7840-445e-bbaf-158fac11000a.jpg", "Converse"));
      
      console.log(this.state.datasets.datasets.length);
      for (var i = 0; i < this.state.datasets.datasets.length; i++) {
        console.log("here");
        console.log("dataset " + this.state.datasets.datasets[i].name);
        images.push(createImage("http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png",this.state.datasets.datasets[i].name, this.state.datasets.datasets[i]._id));
      }
      
      
      this.BrandNamesList = images.map(function(image, i){
        return <div className="dataSetBox" key = {image.src.toString()}> 
        <button> <img height="300px" width="300px" src={image.src.toString()} onClick={() => imageClick(image.title.toString(), image.id.toString())}/> {image.title.toString()}</button> 
        </div>;
      })
      this.onSubmit = this.onSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    onSubmit(ev) {
      this.state.pictures = [];
    }

    handleChange (brand_name, id) {
      this.state.brand_name = brand_name;
        cookie.save('brandName', this.state.brand_name, { path: '/' , 'maxAge': 100000});
        fetch('http://localhost:2000/datasets/'+ id + '/scrape', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + this.state.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "hashtag": (brand_name).toLowerCase(),
          "image_count": "30"
        })
      }).then(response => response.json())
      .then(json => {
        console.log("in here yooo");
        console.log(json.filePaths);
        this.state.imageJSONS = json;
        cookie.remove('imageJSONS');
        cookie.save('imageJSONS', json.filePaths, { path: '/' , 'maxAge': 100000});
        console.log(cookie.load('imageJSONS'));
        // this.state.imageJSON = json;
        // console.log(this.state.imageJSON );
        // this.setState({
        //   loading: false
        // })
        this.props.history.push({
          pathname: '/datasetlanding',
          params: {
            img: this.imageJSONS
          }
        })
        
      }).then(
        console.log("hi")
      );
    }

    render() {
      return (
      <Container>
          <center>
              <h5> CREATE A NEW DATA SET </h5>
              <ImagesUploader
                url="http://localhost:9090/multiple"
                optimisticPreviews
                onLoadEnd={(err) => {
                    if (err) {
                        console.error(err);
                    }
                }}
                label=""
                />
                <Button className="searchBtn" disabled={this.state.pictures.length > 0} onClick={this.onSubmit}> Submit </Button>
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