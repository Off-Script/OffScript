import React from 'react';
import { Link } from 'react-router-dom';
// import Interweave from 'interweave';
import scriptComparison from '../lib/ScriptComparison.js'
import Chart from './Chart.jsx';
import Editor from "./Editor.jsx";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scriptData: [],
      transData: [],
<<<<<<< HEAD
      scoreData: [],
      radarlabels: []
    };
    this.comparison = scriptComparison(this.props.script, this.props.transcript);
    this.makeCharts = this.makeCharts.bind(this);
=======
      labels: [],
      comparison: scriptComparison(this.props.script, this.props.transcript)
    };
    this.makeChart = this.makeChart.bind(this);
>>>>>>> Debug editor modal
  }

  componentWillMount() {
    if (this.props.results[0]) {
      this.makeCharts();
    }
  }

  makeCharts() {
    var radarlabels = [];
    var scriptData = [];
    var transData = [];
    var score = Math.floor(this.comparison.similarity*100)
    var scoreData = [score, 100-score]
    for (let i = 0; i < 5; i++) {
      radarlabels.push(this.props.results[0].document_tone.tone_categories[2].tones[i].tone_name);
      scriptData.push(this.props.results[0].document_tone.tone_categories[2].tones[i].score);
      transData.push(this.props.results[1].document_tone.tone_categories[2].tones[i].score);
    }
    this.setState({
      scriptData: scriptData,
      transData: transData,
      radarlabels: radarlabels,
      scoreData: scoreData
    });
  }

  render() {
    return (
      <div className="container">
        <h3>Results</h3>
        <div className="row">
          <div className="col s6">
            <div className="card-panel">
              <h4>Your Script</h4>
              {/* <Interweave
                tagName="p"
                content={this.state.comparison.markedScript} /> */}
              <Editor />
            </div>
          </div>
          <div className="col s6">
            <div className="card-panel">
              <h4>Your Transcript</h4>
              {/* <Interweave
                tagName="p"
                content={this.state.comparison.markedTranscript} /> */}
            </div>
          </div>
        </div>
        <div className="row">
            <h4>Speech Analysis</h4>
            <div className="col s6"><h5>Your Accuracy Score %</h5>
              <Chart
                score={this.state.scoreData}
                charttype={"pie"}
              />
            <div className="col s6"><h4>Your Accuracy Score</h4>
              <h5>{this.state.comparison.similarity} / 100</h5>
            </div>
            <div className="col s6"><h5>Text Analysis</h5>
              <Chart
                labels={this.state.radarlabels}
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
