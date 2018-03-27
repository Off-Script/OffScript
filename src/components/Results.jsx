import React from 'react';
import { Link } from 'react-router-dom';
import Interweave from 'interweave';
import scriptComparison from '../lib/ScriptComparison.js'
import Chart from './Chart.jsx';
import Editor from "./Editor.jsx";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scriptData: [],
      transData: [],
      comparison: scriptComparison(this.props.script, this.props.transcript)
    };
    this.makeCharts = this.makeCharts.bind(this);
  }

  componentWillMount() {
    if (this.props.results[0]) {
      this.makeCharts();
    }
    this.props.comparison(this.props.script, this.props.transcript);
  }

  makeCharts() {
    var scriptData = [];
    var transData = [];
    var scriptEmotion = [];
    var transEmotion = [];
    var scriptLang = [];
    var transLang = [];
    var score = Math.floor(this.state.comparison.similarity)
    var scoreData = [score, 100-score]
    var data = {};
    for (let i = 0; i < 5; i++) {
      scriptData.push(this.props.results[0].document_tone.tone_categories[2].tones[i].score);
      transData.push(this.props.results[1].document_tone.tone_categories[2].tones[i].score);
      scriptEmotion.push(this.props.results[0].document_tone.tone_categories[0].tones[i].score);
      transEmotion.push(this.props.results[1].document_tone.tone_categories[0].tones[i].score);
      if (i < 3) {
        scriptLang.push(this.props.results[0].document_tone.tone_categories[1].tones[i].score);
        transLang.push(this.props.results[1].document_tone.tone_categories[1].tones[i].score);
      }
    }
    this.setState({
      scriptData: scriptData,
      transData: transData,
      scoreData: scoreData
    });
    data = {
      scriptData: scriptData,
      transData: transData,
      scoreData: scoreData,
      scriptEmotion: scriptEmotion,
      transEmotion: transEmotion,
      scriptLang: scriptLang,
      transLang: transLang
    };
    this.props.setdata(data);
  }

  render() {
    return (
      <div className="container">
        <h3>Results</h3>
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
            <button className="waves-effect btn cyan accent-4 hoverable"><i className="material-icons left">graphic_eq</i>Detailed Analysis</button>
          </Link>
        </div>
      </div>
    )
  }
}

module.exports = Results;
