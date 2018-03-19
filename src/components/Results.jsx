import React from 'react';
import { Link } from 'react-router-dom';

const Results  = (props) => (
  <div>
    <h2>Results</h2>
    <div className="row">
      <div className="col s6">
        <h3>Your Script</h3>
        <p>{props.script}</p>
      </div>
      <div className="col s6">
        <h3>Your Transcript</h3>
        <p>{props.transcript}</p>
      </div>
      <h3>Speech Analysis</h3>
        <p>insert graph here</p>
      {// insert graph component here
      }
      <Link to="/analytics">
        <button className="show-analytics">More info</button>
      </Link>
    </div>
  </div>
)

module.exports = Results;
