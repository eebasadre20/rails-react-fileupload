import React from 'react';

export const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark justify-content-between">
        <a className="navbar-brand">Just POST IT</a>
        <div className="form-inline pull-right">
         <a class="btn btn-outline-success my-2 my-sm-0 new-post" href="/posts">Back</a>
        </div>
      </nav>
      
      <hr />
    </div>
  )
 }
   