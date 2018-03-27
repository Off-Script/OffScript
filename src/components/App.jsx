import React from 'react';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
import Header from './Header.jsx';
import Landing from './Landing.jsx';
import ProfileWithRouter from './Profile.jsx';
import Upload from './Upload.jsx';
import Speech from './Speech.jsx';
import Results from './Results.jsx';
import Analytics from './Analytics.jsx';
import Footer from './Footer.jsx';
import Editor from "./Editor.jsx";
import ScriptComparison from '../lib/ScriptComparison.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      script: '',
      transcript: '',
      results: {},
      comparison: '',
      parsedResults: {}
    }
    this.setScript = this.setScript.bind(this);
    this.setTranscript = this.setTranscript.bind(this);
    this.setResults = this.setResults.bind(this);
    this.scriptComparison = this.scriptComparison.bind(this);
    this.setData = this.setData.bind(this);
  }

  setScript(script) {
    this.setState({
      script: script,
      transcript: ''
    });
    this.props.history.push('/speech')
  }

  setTranscript(transcript) {
    this.setState({
      transcript: transcript
    });
  }

  setData(data) {
    this.setState({
      parsedResults: data
    });
  }

  setResults(results) {
    this.setState({
      results: results
    });
    this.props.history.push('/results')
  }

  scriptComparison(one, two) {
    this.setState({
      comparison: ScriptComparison(one, two)
    })
  }
  render () {
    return (
      <div className="app">
        <Header />
        <Editor setscript={this.setScript} comparison={this.state.comparison}/>
        <div className="main">
          <Switch>
            <Route exact path="/" component={ Landing } />
            <Route path="/upload" render={() => <Upload setscript={this.setScript} />} />
            <Route path='/profile' component={ ProfileWithRouter } />
            <Route path="/speech" render={() => <Speech script={this.state.script} settranscript={this.setTranscript} setresults={this.setResults}/>} />
            <Route path="/results" render={() => <Results script={this.state.script} transcript={this.state.transcript} results={this.state.results} comparison={this.scriptComparison} setdata={this.setData}/>} />
            <Route path="/analytics" render={() => <Analytics script={this.state.script} transcript={this.state.transcript} results={this.state.parsedResults}/>} />
            <Redirect to="/"/>
          </Switch>
        </div>
        <Footer />
      </div>
    )
  }
}

export default withRouter(App);
