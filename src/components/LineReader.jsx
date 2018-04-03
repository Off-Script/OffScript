import React from "react";
import Speech from "react-speech";
import VoiceRecognition from "../lib/VoiceRecognition";
import scriptComparison from "../lib/ScriptComparison";
import Interweave from "interweave";

class LineReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      script: [],
      transcript: "",
      line: "",
      index: 0,
      show: true,
      first: true,
      last: false
    };
    this.speech = null;
    this.reset = this.reset.bind(this);
    this.onResult = this.onResult.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.advanceLine = this.advanceLine.bind(this);
    this.previousLine = this.previousLine.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this._handleSpacebar = this._handleSpacebar.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this._handleSpacebar, false);
    let script = null;
    if (this.props.script) {
      if (this.props.script.split((/(([A-Z])\w+:)/)).length > 1) {
        let script = this.props.script.split(/(([A-Z])\w+:)/);
        script.shift();
        this.setState({
          script: script,
          line: script[0],
          index: 0
        });
      }
      else {
        let script = this.props.script.split(/.[A-Z]{2,100}[^a-z]/);
        script.shift();
        this.setState({
          script: script,
          line: script[0],
          index: 0
        });
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleSpacebar, false);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.script !== prevProps.script) {
      let script = this.props.script.split(":");
      this.setState({
        script: script,
        line: script[0],
        index: 0
      });
    }
    if (!this.state.first && this.state.index === 0) {
      this.setState({ first: true });
    }
    if (this.state.last === false && this.state.index >= this.state.script.length - 2) {
      this.setState({ last: true });
    }
    if (this.state.index > 0 && this.state.line !== prevState.line) {
      this.speech.play();
    }
  }

  _handleSpacebar(e) {
    e.preventDefault();
    if (e.keyCode === 32) {
      this.advanceLine();
    }
  }

  handleShow(e) {
    e.preventDefault();
    this.setState({
      show: !this.state.show
    });
  }

  onResult(transcript) {
    var result = transcript.finalTranscript;
    var current = this.state.transcript;
    let ts = scriptComparison(this.state.script[this.state.index + 1], current + result);
    if(ts.differences.length === 1) {
      this.setState({
        perfectLine: true,
        transcript: this.state.script[this.state.index + 1]
      });
    } else {
      this.setState({
        transcript: ts.markedTranscript
      });
    }
  }

  onEnd() {
    this.setState({ start: false, stop: false });
  }

  reset() {
    this.setState({
      transcript: "",
      perfectLine: false
    });
  }

  advanceLine() {
    let index = this.state.index;
    index = index + 2;
    this.setState({
      line: this.state.script[index],
      index: index,
      first: false,
      transcript: "",
      perfectLine: false
    });
  }

  previousLine() {
    let index = this.state.index;
    index = index - 2;
    this.setState({
      line: this.state.script[index],
      index: index,
      last: false,
      transcript: "",
      perfectLine: false
    });
  }

  render() {
    let Loader = null;
    let script = null;
    let lineArray = this.state.script.map((line, index) => 
      <p key={0 + index}>
        <span key={index} className={index === this.state.index + 1 ? "missing" : "normal"} > {index % 2 + 1}: {line}</span>
      </p>
    );
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

    if (this.state.show) {
      script = (
        <div>
          <div className="card-content">
            <h5>Script</h5>
          </div>
          <div className="progress">
            <div className="determinate"></div>
          </div>
          <div className="card-content script-text">
            {lineArray}
          </div>
        </div>
      );
    } else {
      script = (
        <div>
          <div className="card-content">
            <h5 className="grey-text">Script Hidden</h5>
          </div>
          <div className="progress">
            <div className="determinate"></div>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <h1 className="cyan-text">Line Reading</h1>
        </div>
        <div className="row">
          <div className="col s4">
            <a
              className="btn waves-effect cyan accent-4 hoverable"
              onClick={this.handleShow}
            >Toggle Script</a>
            <div className="card grey lighten-4 speech-card">
              {script}
            </div>
          </div>
          <div className="col s8">
            <button className="waves-effect btn cyan accent-4 hoverable" disabled={this.state.first} onClick={this.previousLine}>
              <i className="material-icons left">chevron_left</i>Previous Line
            </button>
            <button className="waves-effect btn cyan accent-4 hoverable" disabled={this.state.last} onClick={this.advanceLine}>
              <i className="material-icons left">chevron_right</i>Next Line
            </button>
            <div className="card grey lighten-4 speech-card">
              <div className="card-content">
                <h5 className="black-text">Current Prompt</h5>
              </div>
              <div className="progress">
                <div className="determinate"></div>
              </div>
              <Speech
                ref={(el) => { this.speech = el; }}
                text={this.state.line}
                textAsButton={true}
                displayText="Play"
                voice="Google UK English Female" 
              />
              {this.state.script[this.state.index]}
            </div>
            <a
              className="btn waves-effect cyan accent-4 hoverable"
              disabled={this.state.disable}
              onClick={() => {
                Materialize.toast("Transcription Started", 3000);
                this.setState({ start: true });
              }}><i className="material-icons">keyboard_voice</i>
            </a>
            <a
              className="btn waves-effect cyan accent-4 hoverable"
              disabled={this.state.disable}
              onClick={() => {
                this.setState({ disable: true });
                Materialize.toast("Loading Transcription . . .", 2000),
                window.setTimeout(function () {
                  this.setState({ start: false, disable: false });
                }.bind(this), 2000);
              }}>
              <i className="material-icons">stop</i>
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

            <div className="card medium grey lighten-4 speech-card">
              <div className="card-content">
                <h5>Your Line</h5>
              </div>
              {Loader}
              {this.state.perfectLine ? <i className="material-icons green left">check</i> : null }
              <Interweave
                tagName="p"
                content={this.state.transcript} 
              />
            </div>
            <a
              className="waves-effect btn cyan accent-4 hoverable"
              disabled={this.state.disable}
              onClick={this.reset} >
              <i className="material-icons left">clear</i>Clear Transcript
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default LineReader;