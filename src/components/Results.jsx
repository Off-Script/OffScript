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

    this.makeChart = this.makeChart.bind(this);
  }

  componentWillMount() {
    this.makeChart();
  }

  makeChart() {
    console.log('making chart');
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
            <h3>Your Script</h3>
            <p>{this.props.script}</p>
          </div>
          <div className="col s6">
            <h3>Your Transcript</h3>
            <Interweave
              tagName="p"
              content={scriptComparison(this.props.script, this.props.transcript)} />
          </div>
          <h3>Speech Analysis</h3>
          <Chart
            labels={this.state.labels}
            scriptdata={this.state.scriptData}
            transdata={this.state.transData}
          />
          <Link to="/">
            <button className="waves-effect btn cyan accent-4 hoverable"><i className="material-icons left">graphic_eq</i>Detailed Analysis</button>
          </Link>
        </div>
      </div>
    )
  }
}

module.exports = Results;
