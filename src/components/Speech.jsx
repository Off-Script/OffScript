import React from 'react';
import VoiceRecognition from '../lib/VoiceRecognition.js'

class Speech extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: false,
      stop: false,
      transcript: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onResult = this.onResult.bind(this);
  }

  handleSubmit(e) {
    this.onEnd();
    this.props.settranscript(this.state.transcript)
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
    console.log(result);
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ start: true })}>start</button>
        <button onClick={() => this.setState({ stop: true })}>stop</button>
        {this.state.start && (
          <VoiceRecognition
            continuous={true}
            onResult={this.onResult}
            onEnd={this.onEnd}
            lang="en-us"
            stop={this.state.stop}
          />
        )}
        <button onClick={this.handleSubmit}>Results</button>
        <p className="flow-text">{this.state.transcript}</p>
      </div>
    )

  }
}

module.exports = Speech;
