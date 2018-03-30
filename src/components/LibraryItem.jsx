import React from 'react';
import axios from 'axios';

class PersonalLibrary extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className="active">
        <div className="collapsible-header"><i className="mdi-av-web"></i>{this.props.script.script_text.slice(5)}</div>
        <div className="collapsible-body"><p>transcript</p></div>
        <div className="collapsible-body"><p>recording</p></div>
      </li>
    )
  }
}

module.exports = PersonalLibrary;


