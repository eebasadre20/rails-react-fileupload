import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';

export default class EditPost extends React.Component {

  title = "";
  content = "";
  file = {};
  imageBase64 = "";
  percentCompleted = 0;
  post = {};
  uploadedImage = {};

  constructor(props) {
      super(props);
      this.onTitleChange = this.onTitleChange.bind(this);
      this.onContentChange = this.onContentChange.bind(this);
      this.onFileSelect = this.onFileSelect.bind(this);
      this.onButtonSubmit = this.onButtonSubmit.bind(this);

      this.post = this.props.post;
      this.uploadedImage = this.props.uploaded_image.shift();
  }

  onTitleChange = (e) => {
			console.log( e.target.value );
      this.post.title = e.target.value;
      this.forceUpdate();
			// this.setState({ post: this.state.post });
  }

  onContentChange = (e) => {
		console.log( e.target.value );
    this.post.content = e.target.value;
    this.forceUpdate();
		// this.setState({ post: this.state.post });
  }

  onFileSelect = (files) => {
		const reader = new FileReader();
      this.file = files.shift();

      reader.onload = (event) => {
        this.imageBase64 = event.target.result;
      };
      reader.readAsDataURL(this.file);
      this.forceUpdate();
  }

  onButtonSubmit = (e) => {
    e.preventDefault();
    document.getElementById('submitButton').setAttribute('disabled', 'disabled');
    ReactDOM.findDOMNode(this.refs.progressBarDiv).style.display = 'block';
      const config = {
        onUploadProgress: function(progressEvent) {
            if( progressEvent.lengthComputable ) {
                this.percentCompleted = ( Math.round( (progressEvent.loaded * 100) / progressEvent.total ) - 2);
                ReactDOM.findDOMNode(this.refs.progressBar).style.width = `${this.percentCompleted}%`;
            }
          }.bind(this)
      }

      return axios.put(`https://justpostit.herokuapp.com/posts/${this.post.id}.json`, {
          post: {
              title: this.post.title,
              content: this.post.content,
							image_base64: this.imageBase64,
							image_id: this.uploadedImage.id
          }
      }, config ).then( response => {
				this.percentCompleted = 100;
				console.log( 'Sending PUT');
        ReactDOM.findDOMNode(this.refs.progressBar).style.width = `${this.percentCompleted}%`;
        setTimeout(() => {
            this.percentCompleted = 0;
            ReactDOM.findDOMNode(this.refs.progressBarDiv).style.display = 'none';
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
            <form >
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
                    <input type="text" value={this.post.title} onChange={this.onTitleChange} /><br />
                    Content: <br />
                    <textarea value={this.post.content} onChange={this.onContentChange}></textarea><br />
                  </div>
                </div>
                <button type="submit" onClick={this.onButtonSubmit}> Update Post </button>
            </form>
          </div>
        </div>
      );
  }
}
