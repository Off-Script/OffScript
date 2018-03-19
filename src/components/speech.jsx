import React from 'react';
import { Link } from 'react-router-dom';

const Results  = (props) => (
  <div>
    <h2>Record speech here</h2>
    <Link to="/results">Get Results</Link>
  </div>
)

module.exports = Results;