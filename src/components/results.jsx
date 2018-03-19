import React from 'react';
import { Link } from 'react-router-dom';

const Results  = (props) => (
  <div>
    <h2>Results</h2>
    <div>
      <h3>Your Script</h3>
      <p>{props.script}</p>
      <h3>Your Transcript</h3>
      <p>{props.transcript}</p>
      <h3>Speech Analysis</h3>
      {// insert graph component here
      }
      <Link to="/analytics">
        <button className="show-analytics">More info</button>
      </Link>
    </div>
  </div>
)

module.exports = Results;