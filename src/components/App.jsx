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
      parsedResults: {},
      isLoggedIn: false,
      user: {}
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

  setUser(user) {
    if (user) {
    this.setState({
      isLoggedIn: true,
      user
    });
    } else if (!user) {
      this.setState({
        isLoggedIn: false,
        user: {}
      })
    }
    console.log('this.state', this.state);
  }

  scriptComparison(one, two) {
    this.setState({
      comparison: ScriptComparison(one, two)
    })
  }
  render () {
    return (
      <div className="app">
        <Header userLoggedIn={this.state.isLoggedIn} setUser={this.setUser.bind(this)}/>
        <Editor setscript={this.setScript} comparison={this.state.comparison}/>
        <div className="main">
          <Switch>
            <Route exact path="/" component={ Landing } />
            <Route path="/upload" userLoggedIn={this.state.isLoggedIn} render={() => <Upload setscript={this.setScript} />} />
            <Route path='/profile' userLoggedIn={this.state.isLoggedIn} component={ ProfileWithRouter } />
            <Route path="/speech" render={() => <Speech script={this.state.script} settranscript={this.setTranscript} setresults={this.setResults}/>} />
            <Route path="/results" userLoggedIn={this.state.isLoggedIn} render={() => <Results script={this.state.script} transcript={this.state.transcript} results={this.state.results} comparison={this.scriptComparison} setdata={this.setData}/>} />
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
