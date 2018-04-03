import React from "react";
import { Link } from "react-router-dom";
import Interweave from "interweave";
import scriptComparison from "../lib/ScriptComparison";
import Chart from "./Chart";
import Editor from "./Editor";
import SaveScriptAnalysis from "./SaveScriptAnalysis";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scriptData: [],
      transData: [],
      scoreData: [],
      comparison: scriptComparison(this.props.script, this.props.transcript)
    };
    this.makeCharts = this.makeCharts.bind(this);
  }

  componentWillMount() {
    if (this.props.results.scriptData) {
      this.makeCharts();
    }
    this.props.comparison(this.props.script, this.props.transcript);
  }

  makeCharts() {
    var score = this.state.comparison.similarity;
    var scoreData = [score, 100-score];
    this.setState({
      scriptData: this.props.results.scriptData,
      transData: this.props.results.transData,
      scoreData: scoreData
    });
    this.props.setscore(scoreData);
  }

  perfectScore() {
    return(
      <div className="card horizontal cyan">
        <div className="card-stacked">
          <div className="card-content">
            <p className="white-text flow-text">Congraulations! You're OffScript!</p>
          </div>
        </div>
      </div>
    );
  }
  greatScore() {
    return(
      <div className="card horizontal cyan">
        <div className="card-stacked">
          <div className="card-content">
            <p className="white-text flow-text">Awesome work! You're sticking pretty close to the script. If there's any words we misheard, those might be spots where you should slow down and enunciate!</p>
          </div>
        </div>
      </div>
    );
  }

  offScript() {
    return(
      <div className="card horizontal cyan">
        <div className="card-stacked">
          <div className="card-content">
            <p className="white-text flow-text">Looks like you improvised a bit! If you want to memorize your current text, check out the problem areas above and give it another go. But if you like your new version better, try our editing feature and click "Go OffScript"! </p>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="container">
        <h3>Your Results</h3>
        <SaveScriptAnalysis userId={this.props.user.id} script={this.props.script} transcript={this.props.transcript} comparison={this.state.comparison} results={this.props.results} scoreData={this.state.scoreData}/>
        <div className="flex-container">
          <div className="script-card">
            <div className="card-panel results">
              <h4>Script</h4>
              <Interweave
                tagName="p"
                content={this.state.comparison.markedScript} />
              <a className="waves-effect btn cyan accent-4 hoverable modal-trigger" href="#modal-editor"><i className="material-icons left">build</i>Edit Speech</a>
            </div>
          </div>
          <div className="transcript-card">
            <div className="card-panel results">
              <h4>Transcript</h4>
              <Interweave
                tagName="p"
                content={this.state.comparison.markedTranscript} />
            </div>
          </div>
        </div>
        <div className="row">
          { this.state.comparison.similarity === 100 ? this.perfectScore() : this.state.comparison.similarity > 80 ? this.greatScore() : this.offScript() }
        </div>
        <h4>Speech Analysis</h4>
        <div className="row">
          <div className="col s6"><h5>Your Accuracy Score %</h5>
            <Chart
              data={this.state.scoreData}
              charttype={"doughnut"}
            />
          </div>
          <div className="col s6"><h5>Text Analysis</h5>
            <Chart
              scriptdata={this.state.scriptData}
              transdata={this.state.transData}
              charttype={"radar"}
            />
          </div>
        </div>
        <div>
          <Link to="/analytics">
            <button id="analytics-button" className="animated infinite pulse waves-effect btn cyan accent-4 hoverable"><i className="material-icons left">graphic_eq</i>Detailed Analysis</button>
          </Link>
        </div>
      </div>
    );
  }
}

module.exports = Results;
