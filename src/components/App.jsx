import React from 'react';
import { Route } from 'react-router-dom';
import Landing from './Landing.jsx';
import Upload from './Upload.jsx';
import Speech from './Speech.jsx';
import Results from './Results.jsx';
import Analytics from './Analytics.jsx';

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
        <Route path="/analytics" component={ Analytics } />
      </div>
    )
  }
}

module.exports = App;
