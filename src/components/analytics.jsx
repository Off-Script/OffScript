import React from 'react';

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
          <a href="/analytics">
          <button>One more time</button>
          </a>
        </div>
        <div className="container">
          <h2 className="analytics-title">Detailed Analysis</h2>
          <img src="http://i1-scripts.softpedia-static.com/screenshots/Chart-js_1.png"/>
        </div>
      </div>
    )
  }
}

module.exports = Analytics;