import React from 'react';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import ProfileWithRouter from './Profile';
import Upload from './Upload';
import Speech from './Speech';
import Results from './Results';
import Analytics from './Analytics';
import Footer from './Footer';
import Editor from "./Editor";
import LineReader from "./LineReader";
import ScriptComparison from '../lib/ScriptComparison';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      script: '',
      transcript: '',
      results: {},
      score: [],
      comparison: '',
      isLoggedIn: false,
      user: {}
    }
    this.setScript = this.setScript.bind(this);
    this.setTranscript = this.setTranscript.bind(this);
    this.setLines = this.setLines.bind(this);
    this.setResults = this.setResults.bind(this);
    this.scriptComparison = this.scriptComparison.bind(this);
    this.setScore = this.setScore.bind(this);
  }

  // componentDidMount() {
  //   this.checkSession();
  // }

  checkSession() {

    // axios.get('/session')
    //   .then((response) => {
    //     return this.checkLogin();
    //   })
    //   .catch((err) => {
    //     console.log('no user in session');
    //     this.setState({
    //       isLoggedIn: false,
    //       user: {}
    //     })
    //   });
  }

  checkLogin() {
    // return axios.get('/user')
    //   .then((user) => {
    //     console.log('current user is:', user.data.rows[0]);
    //     this.setState({
    //       isLoggedIn: true,
    //       user: user.data.rows[0]
    //     });
    //   })
    //   .catch((err) => {
    //     console.log('sign in failed, try again');
    //   });
  }

  setScript(script) {
    this.setState({
      script: script,
      transcript: ''
    });
    this.props.history.push('/speech');
  }

  setLines(script) {
    this.setState({
      script: script,
      transcript: ''
    })
    this.props.history.push('/linereader');
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

  setScore(score) {
    this.setState({
      score: score
    });
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
        <Header userLoggedIn={this.state.isLoggedIn} user={this.state.user} setUser={this.setUser.bind(this)}/>
        <Editor setscript={this.setScript} comparison={this.state.comparison}/>
        <div className="main">
          <Switch>
            <Route exact path="/" component={ Landing } />
            <Route path="/upload" user={this.state.user} userLoggedIn={this.state.isLoggedIn}
              render={() => <Upload
                setscript={this.setScript}
                setlines={this.setLines} />} />
            <Route path='/profile' user={this.state.user} userLoggedIn={this.state.isLoggedIn}
              render={() => <ProfileWithRouter
                setscript={this.setScript}/>} />
            <Route path='/linereader' user={this.state.user} userLoggedIn={this.state.isLoggedIn}
              render= {() => <LineReader
                script={this.state.script} />} />
            <Route path="/speech"
              render={() => <Speech
                script={this.state.script}
                settranscript={this.setTranscript}
                setresults={this.setResults}/>} />
            <Route path="/results" userLoggedIn={this.state.isLoggedIn}
              render={() => <Results
                user={this.state.user}
                script={this.state.script}
                transcript={this.state.transcript}
                results={this.state.results}
                comparison={this.scriptComparison}
                setscore={this.setScore}
              />}
            />
            <Route path="/analytics"
              render={() => <Analytics
                script={this.state.script}
                transcript={this.state.transcript}
                results={this.state.results}
                score={this.state.score}
              />}
            />
            <Redirect to="/"/>
          </Switch>
        </div>
        <Footer />
      </div>
    )
  }
}

export default withRouter(App);
