import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';

import NewPost from './NewPost';

export default class Main extends React.Component {
  state = {
    posts: []
  }

  componentDidMount() {
    return axios.get('http://localhost:3000/posts.json')
      .then( response => {
        this.state.posts = response.data;
        console.log( this.state.posts );
        debugger;
      }).catch( error => {
        console.log( error );
      })
  }

  render() {
    return (
        <div>
          <h3>
            POST IT
          </h3>

          <Link to="/post/new"> New Post </Link>

          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              { this.state.posts.map( post => {
                <div className="row">
                  <div className="col-md-6">
                    <img src={post.uploaded_image.medium} alt="..." className="img-thumbnail" />
                  </div>
                  <div className="col-md-6">
                    <p> Title: {post.title}</p>
                    <p> Content: {post.content}</p>
                  </div>
                </div>
                }
              )}
            </div>
          </div>
        </div>
    );
  }
}
