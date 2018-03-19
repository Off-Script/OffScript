import React from 'react';
import { Route } from 'react-router-dom';
import Landing from './Landing.jsx';
import Upload from './upload.jsx';
import Speech from "./speech.jsx";
import Results from "./results.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <Route exact path='/' component={ Upload } />
        <Route path='/speech' component={ Speech } />
        <Route path='/landing' component={ Landing } />
        <Route path='/results' component= { Results } />
      </div>
    )
  }
}

module.exports = App;