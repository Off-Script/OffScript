import React from 'react';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
import Header from './Header.jsx';
import Landing from './Landing.jsx';
import Upload from './Upload.jsx';
import Speech from './Speech.jsx';
import Results from './Results.jsx';
import Analytics from './Analytics.jsx';
import Footer from './Footer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      script: '',
      transcript: '',
      results: {}
    }
    this.setScript = this.setScript.bind(this);
    this.setTranscript = this.setTranscript.bind(this);
    this.setResults = this.setResults.bind(this);
  }

  setScript(script) {
    this.setState({
      script: script
    });
    this.props.history.push('/speech')
  }

  setTranscript(transcript) {
    this.setState({
      transcript: transcript
    });
  }

  setResults(results) {
    this.setState({
      results: results
    });
    this.props.history.push('/results')
  }

  render () {
    return (
      <div className="app">
        <Header />
        <div className="main">
          <Switch>
            <Route exact path="/" component={ Landing } />
            <Route path="/upload" render={() => <Upload setscript={this.setScript} />} />
            <Route path="/speech" render={() => <Speech script={this.state.script} settranscript={this.setTranscript} setresults={this.setResults}/>} />
            <Route path="/results" render={() => <Results script={this.state.script} transcript={this.state.transcript} results={this.state.results} />} />
            <Route path="/analytics" render={() => <Analytics script={this.state.script} transcript={this.state.transcript} results={this.state.results}/>} />
            <Redirect to="/"/>
          </Switch>
        </div>
        <Footer />
      </div>
    )
  }
}

export default withRouter(App);
