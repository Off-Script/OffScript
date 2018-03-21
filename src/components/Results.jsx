import React from 'react';
import { Link } from 'react-router-dom';
import Interweave from 'interweave';
import scriptComparison from '../lib/ScriptComparison.js'

const Results  = (props) => (
  <div className="container">
    <h2>Results</h2>
    <div className="row">
      <div className="col s6">
        <h3>Your Script</h3>
        <p>{props.script}</p>
      </div>
      <div className="col s6">
        <h3>Your Transcript</h3>
        <Interweave
          tagName="p"
          content={scriptComparison(props.script, props.transcript)} />
      </div>
      <h3>Speech Analysis</h3>
        <p>insert graph here</p>
      <Link to="/analytics">
        <button className="waves-effect btn cyan accent-4 hoverable"><i class="material-icons left">graphic_eq</i>Detailed Analysis</button>
      </Link>
    </div>
  </div>
)

module.exports = Results;
