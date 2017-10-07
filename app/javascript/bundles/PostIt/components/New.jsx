import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { FormErrors } from './FormErrors';
import { Header } from './Header';

export default class NewPost extends React.Component {

  title = "";
  content = "";
  file = {};
  imageBase64 = "";
  percentCompleted = 0;
  formErrors = [];
  
  constructor(props) {
      super(props);
      this.onFileSelect = this.onFileSelect.bind(this);
      this.onButtonSubmit = this.onButtonSubmit.bind(this);

      this.state = {
        title: '',
        content: '',
        formErrors: [],
        titleValid: false,
        contentValid: false,
        imageBase64Valid: false,
        image_base64: false,
        formValid: false
      }
  }

  onHandleUserInput = ( e ) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value });
  }

  onFileSelect(files) {
      const reader = new FileReader();
    
      this.file = files.shift();

      reader.onload = (event) => {
        this.imageBase64 = event.target.result;
      };
      reader.readAsDataURL(this.file);
      this.forceUpdate();
  }

  onButtonSubmit( e ) {
    e.preventDefault();

    ReactDOM.findDOMNode(this.refs.progressBarDiv).style.display = 'block';
      const config = {
        onUploadProgress: function(progressEvent) {
            if( progressEvent.lengthComputable ) {
                this.percentCompleted = ( Math.round( (progressEvent.loaded * 100) / progressEvent.total ) - 2);
                ReactDOM.findDOMNode(this.refs.progressBar).style.width = `${this.percentCompleted}%`;
            }
          }.bind(this)
      }

      return axios.post('https://justpostit.herokuapp.com/posts.json', {
          post: {
              title: this.state.title,
              content: this.state.content,
              image_base64: this.imageBase64
          }
      }, config ).then( response => {
        this.percentCompleted = 100;
        ReactDOM.findDOMNode(this.refs.progressBar).style.width = `${this.percentCompleted}%`;
        this.refs.newPost.reset();
        
        setTimeout(() => {
            ReactDOM.findDOMNode(this.refs.progressBarDiv).style.display = 'none';
            this.percentCompleted = 0;
            ReactDOM.findDOMNode(this.refs.progressBar).style.width = `${this.percentCompleted}%`;
            window.location.replace("https://justpostit.herokuapp.com");
        }, 3000);
      }).catch(  error => {
        const formErrors = error.response.data;
        this.validateFormField( formErrors );
        this.setState({ formErrors: formErrors });
        console.log( this.state.formErrors );
        ReactDOM.findDOMNode(this.refs.progressBarDiv).style.display = 'none';
        this.percentCompleted = 0;
        ReactDOM.findDOMNode(this.refs.progressBar).style.width = `${this.percentCompleted}%`;
      });
  }

  validateFormField( formErrors ) {
    Object.keys( formErrors ).map( key => {
      switch( key ) {
        case 'title':
          this.setState({ titleValid: true });
          this.setState({ formValid: true });
          break;
        case 'content':
          this.setState({ contentValid: true });
          this.setState({ formValid: true });
          break;
        case 'image_base64':
          this.setState({ contentValid: true });
          this.setState({ formValid: true });
          break;
        default:
          break;
      }
    });
  }

  errorClass( formField ) {
    return formField === true ? 'has-error' : '';
  }

  render() {
    return (
      <div>
        <Header />

        <div className="row">
          <div className="upload-form">
            <div className="progress" ref={"progressBarDiv"} style={{ display: 'none', width: '100%' }}>
              <div ref={"progressBar"} className="progress-bar progress-bar-striped" role="progressbar" style={ { width: '0%' } } aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
            </div>

              <FormErrors formErrors={ this.state.formErrors } />

              <form ref={'newPost'}>
                <div className="row">
                  <div className="row">
                    <Dropzone className="dropzone" onDrop={this.onFileSelect}>
                        <img src={this.file.preview} style={{width: "100%"}} className={ `${this.errorClass(this.state.imageBase64Valid)}` }/>
                    </Dropzone>
                  </div>

                  <div className="row">
                    <div className="input ">
                      <label className="col-md-12">Title:</label>
                      <div className="col-md-12">
                        <input className={ `col-md-12 ${this.errorClass(this.state.titleValid)}` } type="text" name="title" onChange={this.onHandleUserInput} />
                      </div>
                    </div>

                    <div className="input">
                      <label className="col-md-12">Content:</label>
                      <div className="col-md-12">
                        <textarea className={ `col-md-12 ${this.errorClass(this.state.contentValid)}` } name="content" onChange={this.onHandleUserInput}></textarea>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="row">
                  <div className="upload-btn">
                    <button type="submit" className="btn btn-primary btn-md btn-block" onClick={this.onButtonSubmit}> Create Post </button>
                  </div>
                </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
