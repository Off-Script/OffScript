import React from 'react';


class PersonalLibrary extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h6>my scripts</h6>
        <ul className="collapsible">
          <li className="active">
            <div className="collapsible-header"><i className="mdi-av-web"></i>Hamlet</div>
            <div className="collapsible-body"><p>transcript</p></div>
            <div className="collapsible-body"><p>recording</p></div>
          </li>
          <li>
            <div className="collapsible-header"><i className="mdi-editor-format-align-justify"></i>King John</div>
            <div className="collapsible-body"><p>transcript</p></div>
            <div className="collapsible-body"><p>recording</p></div>
          </li>
          <li>
            <div className="collapsible-header"><i className="mdi-av-play-shopping-bag"></i>Arcadia</div>
            <div className="collapsible-body"><p>transcript</p></div>
            <div className="collapsible-body"><p>recording</p></div>
          </li>
          <li>
            <div className="collapsible-header"><i className="mdi-editor-insert-comment"></i>Betrayal</div>
            <div className="collapsible-body"><p>transcript</p></div>
            <div className="collapsible-body"><p>recording</p></div>
          </li>
        </ul>
      </div>
    )
  }
}

module.exports = PersonalLibrary;


