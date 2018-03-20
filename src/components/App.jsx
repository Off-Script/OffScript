import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Header from "./Header.jsx";
import Landing from './Landing.jsx';
import Upload from './Upload.jsx';
import Speech from "./Speech.jsx";
import Results from "./Results.jsx";
import Analytics from './Analytics.jsx';
import Footer from "./Footer.jsx"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      script: undefined,
      transcript: undefined
    }
    this.setScript = this.setScript.bind(this);
    this.setTranscript = this.setTranscript.bind(this);
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
    this.props.history.push('/results')
  }

  render () {
    return (
      <div className="container">
        <Header />
        <Route exact path='/' render={() => <Upload setscript={this.setScript} />} />
        <Route path='/speech' render={() => <Speech settranscript={this.setTranscript} />} />
        <Route path='/landing' component={ Landing } />
        <Route path='/results' render={() => <Results script={this.state.script} transcript={this.state.transcript} />} />
        <Route path="/analytics" component={ Analytics } />
        <Footer />
      </div>
    )
  }
}

export default withRouter(App);
