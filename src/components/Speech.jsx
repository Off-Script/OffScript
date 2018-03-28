import React from "react";
import VoiceRecognition from "../lib/VoiceRecognition";
import axios from "axios";

class Speech extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: false,
      stop: false,
      transcript: "",
      results: {},
      loading: false,
      show: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onResult = this.onResult.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleSubmit(e) {
    this.onEnd();
    e.preventDefault();
    this.props.settranscript(this.state.transcript);
    this.setState({
      loading: true
    });
    axios.post("/api/script", {
      script: this.props.script,
      transcript: this.state.transcript
    })
      .then((res) => {
        console.log("handling submit", res);
        this.props.setresults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleShow(e) {
    e.preventDefault();
    this.setState({
      show: !this.state.show
    });
  }

  onEnd() {
    this.setState({ start: false, stop: false });
  }

  onError() {
    console.log("error");
  }

  onResult(transcript) {
    var result = transcript.finalTranscript;
    var current = this.state.transcript;
    this.setState({
      transcript: current + result + "."
    });
  }

  reset() {
    this.setState({
      transcript: ""
    });
  }

  render() {
    let Loader = null;
    let script = null;
    if (this.state.loading) {
      return (
        <div className="big-loader">
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div><div className="gap-patch">
                <div className="circle"></div>
              </div><div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (this.state.show) {
      script = (
        <div className="script">
          Script
          <div className="card-content">
            {this.props.script}
          </div>
        </div>
      );
    } else {
      script = (
        <div className="script">
          Script Hidden
        </div>
      );
    }


    if (this.state.start) {
      Loader = (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      );
    } else {
      Loader = (
        <div className="progress">
          <div className="determinate"></div>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col s4">
            <a
              className="btn waves-effect cyan accent-4 hoverable"
              onClick={this.handleShow}
            >Show Script</a>
            <div className="card grey lighten-4 speech-card">
              {script}
            </div>
          </div>
          <div className="col s8">
            <a
              className="btn waves-effect cyan accent-4 hoverable"
              onClick={() => {
                Materialize.toast("Transcription Started", 3000);
                this.setState({ start: true });
              }}><i className="material-icons">keyboard_voice</i>
            </a>
            <a
              className="btn waves-effect cyan accent-4 hoverable"
              onClick={() => {
                Materialize.toast("Transcription Stopped", 3000);
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
            <div className="card medium grey lighten-4 speech-card">
              <div className="card-content">
                <h5>Transcript</h5>
              </div>
              {Loader}
              <p className="flow-text transcript-text">{this.state.transcript}</p>
            </div>
          </div>
        </div>
        <a onClick={this.reset} className="waves-effect btn cyan accent-4 hoverable"><i className="material-icons left">refresh</i>Start Over</a>
      </div>
    );

  }
}

module.exports = Speech;
