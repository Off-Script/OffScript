import React from 'react';
import VoiceRecognition from '../lib/VoiceRecognition.js'
import axios from 'axios';

class Speech extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: false,
      stop: false,
      transcript: '',
      results: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onResult = this.onResult.bind(this);
  }

  handleSubmit(e) {
    this.onEnd();
    e.preventDefault();
    axios.post('/api/script', {
      script: this.props.script,
      transcript: this.state.transcript
    })
    .then((res) => {
      console.log('handling submit', res);
      this.props.settranscript(this.state.transcript);
      this.props.setresults(res.data);
    })
    .catch((err) => {
       console.log(err);
     })
  }

  onEnd() {
    this.setState({ start: false, stop: false });
  }

  onError() {
    console.log('error');
  }

  onResult(transcript) {
    var result = transcript.finalTranscript;
    var current = this.state.transcript;
    this.setState({
      transcript: current + result + '.'
    });
  }

  render() {
    let Loader = null;

    if (this.state.start) {
      Loader =
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
    } else {
      Loader =
        <div className="progress">
          <div className="determinate"></div>
        </div>
    }
    return (
      <div className="container">
        <a
          className="btn waves-effect cyan accent-4 hoverable"
          onClick={() => {
            Materialize.toast('Transcription Started', 3000);
            this.setState({ start: true });
          }}><i className="material-icons">keyboard_voice</i>
        </a>
        <a
          className="btn waves-effect cyan accent-4 hoverable"
          onClick={() => {
            Materialize.toast('Transcription Stopped', 3000);
            this.setState({ start: false });
          }}><i className="material-icons">stop</i>
        </a>
        {this.state.start && (
          <VoiceRecognition
            continuous={true}
            onResult={this.onResult}
            onEnd={this.onEnd}
            lang="en-us"
            stop={this.state.stop}
          />
        )}
        <a
          className="btn waves-effect cyan accent-4 hoverable"
          onClick={this.handleSubmit}>Submit
          <i className="material-icons right">send</i>
        </a>
        <div className="card medium grey lighten-4">
          <div className="card-content">
            <h5>Transcript</h5>
          </div>
          {Loader}
          <p className="flow-text transcript-text">{this.state.transcript}</p>
        </div>
      </div>
    )

  }
}

module.exports = Speech;
