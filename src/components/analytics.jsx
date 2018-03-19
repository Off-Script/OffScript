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
        <div className="navbar">
          <a href="/">
          <button>One more time</button>
          </a>
        </div>
        <div className="container">
          <h2 className="analytics-title">Detailed Analysis</h2>
        </div>
        <Chart />
      </div>
    )
  }
}

module.exports = Analytics;