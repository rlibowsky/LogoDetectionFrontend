import React from 'react';
import { Button } from 'reactstrap';
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import './train.css';
import cookie from "react-cookies";
import ToolTip from 'react-portal-tooltip';

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
    var parentStr = "#" + this.state.title.toString();
    return (
        <div className="dataSetBox" key = {this.state.title.toString()}> 
        <Loading show={this.state.loading} color="red"/>
        <button> <img height="300px" width="300px" id={this.state.title.toString()} src={this.state.src.toString()} onClick={() => this.imageClick(this.state.title.toString(), this.state.id.toString())}/> {this.state.title.toString()}</button> 
        <ToolTip active={this.state.showToolTipActive} parent={parentStr} position="right" arrow="center" >
              <div> Test </div>
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