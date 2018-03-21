import React from 'react';
import Chart from './Chart.jsx';

class Analytics extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <a href="/upload" className="waves-effect btn cyan accent-4 hoverable"><i class="material-icons left">refresh</i>One more time</a>
        <div className="container">
          <h5 className="analytics-title">Detailed Analysis</h5>
        </div>
        <div className="row">
          <div className="col l6 m12">
            <div className="card-panel">
              <Chart />
            </div>
            <div className="card-panel">
              <Chart />
            </div>
          </div>
          <div className="col l6 m12">
            <div className="card-panel">
              <Chart />
            </div>
            <div className="card-panel">
              <Chart />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Analytics;
