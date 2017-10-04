import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';

export default class NewPost extends React.Component {
  
  state = {

  }

  title = "";
  content = "";
  file = {};
  imageBase64 = "";
  percentCompleted = 0;
  
  constructor(props) {
      super(props);
      this.onTitleChange = this.onTitleChange.bind(this);
      this.onContentChange = this.onContentChange.bind(this);
      this.onFileSelect = this.onFileSelect.bind(this);
      this.onButtonSubmit = this.onButtonSubmit.bind(this);
  }

  onTitleChange(e) {
      this.title = e.target.value;
  }

  onContentChange(e) {
      this.content = e.target.value;
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

  onButtonSubmit() {
    ReactDOM.findDOMNode(this.refs.progressBarDiv).style.display = 'block';
      const config = {
        onUploadProgress: function(progressEvent) {
            if( progressEvent.lengthComputable ) {
                this.percentCompleted = ( Math.round( (progressEvent.loaded * 100) / progressEvent.total ) - 2);
                ReactDOM.findDOMNode(this.refs.progressBar).style.width = `${this.percentCompleted}%`;
            }
          }.bind(this)
      }

      return axios.post('http://localhost:3000/posts', {
          post: {
              title: this.title,
              content: this.content,
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
            this.title = '';
            this.content = '';
            this.file = {};
        }, 3000);
      }).catch( error => {
          console.log( error );
      });
  }

    

  render() {

      return (
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <form method="POST" action="#" ref="newPost">
                <div className="row">
                  <div className="progress" ref={"progressBarDiv"} style={{ display: 'none', width: '250px' }}>
                    <div ref={"progressBar"} className="progress-bar progress-bar-striped" role="progressbar" style={ { width: '0%' } } aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <div className="col-md-6">
                    File: <br />
                    <Dropzone onDrop={this.onFileSelect}>
                        <img src={this.file.preview} style={{width: "100%"}}/>
                    </Dropzone>
                  </div>
                  <div className="col-md-6">
                    Title: <br />
                    <input type="text" onChange={this.onTitleChange} /><br />
                    Content: <br />
                    <textarea onChange={this.onContentChange}></textarea><br />
                  </div>
                </div>
                <button type="button" onClick={this.onButtonSubmit}>Create Post</button>
            </form>
          </div>
        </div>
      );
  }
}
