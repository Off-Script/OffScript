import React from 'react';
import { Route } from 'react-router-dom';
import Upload from './upload.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
        <Route path='/' component={ Upload } />
      </div>
    )
  }
}

module.exports = App;