import React from 'react';
import { Route } from 'react-router-dom';
import Upload from './Upload.jsx';
import Speech from './Speech.jsx';
import Landing from './Landing.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
        <Route exact path='/' component={ Upload } />
        <Route path='/speech' component={ Speech } />
        <Route path='/landing' component={ Landing } />
      </div>
    )
  }
}

module.exports = App;