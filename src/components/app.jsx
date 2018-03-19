import React from 'react';
import { Route } from 'react-router-dom';
import Upload from './Upload.jsx';
import Speech from './Speech.jsx'

class App extends React.Component {
  render () {
    return (
      <div>
        <Route exact path='/' component={ Upload } />
        <Route path='/speech' component={ Speech } />
      </div>
    )
  }
}

module.exports = App;