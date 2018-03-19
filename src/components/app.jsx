import React from 'react';
import { Route } from 'react-router-dom';
import Landing from './Landing.jsx';
import Upload from './upload.jsx';
import Speech from "./speech.jsx";
import Results from "./results.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      script: undefined
    }
    this.setScript = this.setScript.bind(this);
  }

  setScript(script) {
    this.setState({
      script: script
    });
  }

  render () {
    return (
      <div>
        <Route exact path='/' render={() => <Upload setscript={this.setScript} />} />
        <Route path='/speech' component={ Speech } />
        <Route path='/landing' component={ Landing } />
        <Route path='/results' render={() => <Results script={this.state.script} />} />
      </div>
    )
  }
}

module.exports = App;