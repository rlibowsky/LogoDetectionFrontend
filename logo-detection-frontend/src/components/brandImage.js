import React from 'react';
import { Button } from 'reactstrap';
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import './train.css';
import cookie from "react-cookies";
import ToolTip from 'react-portal-tooltip';
import { stringify } from 'querystring';

  export default class BrandImage extends React.Component { 
    constructor(props) {
      super(props);
      this.state = {
        showToolTipActive: false,
        image: this.props.image,
        src: this.props.image.src,
        alt: this.props.image.title,
        title: this.props.image.title,
        id: this.props.image.id,
        loading: false,
        token: cookie.load('token') 
      };

      this.imageClick = this.imageClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    imageClick = (brand_name, id) => {
        this.setState({
          showToolTipActive: !this.state.showToolTipActive
        });
    }



    

    handleChange (brand_name, id) {
      var jsonImg;
      const postBing = () => {
        console.log("in post bing!")
        fetch('http://localhost:2000/datasets/'+ id +'/uploadImages', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + this.state.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "images":arr,
          })
        }).then(response => response.json())
        .then(data => {
          var imageArray = data['images'];
          cookie.save('brandName', brand_name, { path: '/' , 'maxAge': 100000});
          cookie.remove('imageJSONS');
          cookie.save('imageJSONS', arr.slice(0,20), { path: '/' , 'maxAge': 100000});
          cookie.remove('currentDataSet');
          cookie.save('currentDataSet', id, { path: '/' , 'maxAge': 100000});
          this.props.history.push('/datasetlanding/' + brand_name.toLowerCase());
        });
        this.setState({
            loading: true
          })
      };



      let https = require('https');
      let subscriptionKey = 'ebf811d0d7bb493089f573dae59b08ab';
      let host = 'api.cognitive.microsoft.com';
      let path = '/bing/v7.0/images/search';
      let term = brand_name;
      console.log("term is " + term);
      var arr = [];
      let response_handler = function (response) {
          let body = '';
          response.on('data', function (d) {
              body += d;
          });
          response.on('end', function () {
              let json = JSON.parse(body);
              body = JSON.stringify(JSON.parse(body), null, '  ');
              console.log('\nJSON Response:\n');
              console.log(json);
              var images = json['value']
              for (var key in images) {
                  var val = images[key];
                  var contentURL = val['contentUrl'];
                  arr.push(contentURL);
              }
              var shuffle = require('shuffle-array');
              shuffle(arr);
          });
          response.on('error', function (e) {
              console.log('Error: ' + e.message);
          });
      };
      let bing_web_search = function (search) {
        console.log('Searching the Web for: ' + term);
        var options = [];
        options.push("width=600");
        options.push("height=600");
        let request_params = {
              method : 'GET',
              hostname : host,
              path : path + '?q=' + encodeURIComponent(search) + "&" + options.join("&"),
              headers : {
                  'Ocp-Apim-Subscription-Key' : subscriptionKey,
              }
          };
          let req = https.request(request_params, response_handler);
          req.end();
      }  
      if (subscriptionKey.length === 32) {
          bing_web_search(term);
      } else {
          console.log('Invalid Bing Search API subscription key!');
          console.log('Please paste yours into the source code.');
      }
      setTimeout(function(){
        postBing(arr);
      }, 2000);

    }
  

  render() {

    var parentStr = "#" + this.state.title.toString();
    return (
        <div className="dataSetBox" key = {this.state.title.toString()}> 
        <Loading show={this.state.loading} color="red"/>
        <button> <img height="300px" width="300px" id={this.state.title.toString()} src={this.state.src.toString()} onClick={() => this.imageClick(this.state.title.toString(), this.state.id.toString())}/> {this.state.title.toString()}</button> 
        <ToolTip active={this.state.showToolTipActive} parent={parentStr} position="right" arrow="center" >
              <div className="imgButton">
                <Button onClick={() => this.handleChange(this.state.title.toString(), this.state.id.toString())}> See Data set </Button>
              </div>
              <div className="imgButton">
                <Button onClick={() => this.props.parent.deleteDataSet(this.state.title.toString(), this.state.id.toString())}> Delete Data set </Button>
                <Loading show={this.state.loading} color="red" />
              </div>
            </ToolTip>
        </div>
    );
    
  }
}