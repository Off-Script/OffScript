import React from 'react';
import { Link } from 'react-router-dom';
import Interweave from 'interweave';
import scriptComparison from '../lib/ScriptComparison.js'
import Chart from './Chart.jsx';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scriptData: [],
      transData: [],
      labels: []
    };
    this.comparison = scriptComparison(this.props.script, this.props.transcript);
    this.makeChart = this.makeChart.bind(this);
  }

  componentWillMount() {
    this.makeChart();
  }

  makeChart() {
    var labels = [];
    var scriptData = [];
    var transData = [];
    for (let i = 0; i < 5; i++) {
      labels.push(this.props.results[0].document_tone.tone_categories[2].tones[i].tone_name);
      scriptData.push(this.props.results[0].document_tone.tone_categories[2].tones[i].score);
      transData.push(this.props.results[1].document_tone.tone_categories[2].tones[i].score);
    }
    this.setState({
      scriptData: scriptData,
      transData: transData,
      labels: labels
    });
  }

  render() {
    return (
      <div className="container">
        <h2>Results</h2>
        <div className="row">
          <div className="col s6">
            <div className="card-panel">
              <h4>Your Script</h4>
              <Interweave
                tagName="p"
                content={this.comparison.markedScript} />
            </div>
          </div>
          <div className="col s6">
            <div className="card-panel">
              <h4>Your Transcript</h4>
              <Interweave
                tagName="p"
                content={this.comparison.markedTranscript} />
            </div>
          </div>
          <div className="row">
            <h4>Speech Analysis</h4>
            <div className="col s6"><h4>Your Accuracy Score</h4>
              <h5>{Math.floor(this.comparison.similarity*100)} / 100</h5>
            </div>
            <div className="col s6"><h4>Text Analysis</h4>
              <Chart
                labels={this.state.labels}
                scriptdata={this.state.scriptData}
                transdata={this.state.transData}
              />
            </div>
          </div>
          <Link to="/upload">
            <button className="waves-effect btn cyan accent-4 hoverable"><i className="material-icons left">graphic_eq</i>Detailed Analysis</button>
          </Link>
        </div>
      </div>
    )
  }
}

module.exports = Results;
