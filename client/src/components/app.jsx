import React from 'react';
import { Route, Link } from 'react-router-dom';
import Landing from './landing.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
        <Route exact path='/' component={ Landing } />
      </div>
    )
  }
}

module.exports = App;