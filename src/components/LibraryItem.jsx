import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class PersonalLibrary extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to={{ pathname: "/speech" }}>
        {this.props.script.script_text}
      </Link>
    );
  }
}

module.exports = PersonalLibrary;


