import React from 'react';
import { Link } from 'react-router-dom';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      script: 'Enter Script Here'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      script: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log(this.state.script);
    this.setState({
      script: 'Enter Script Here'
    });
  }

  render() {
    return (
      <div>
        Script:<br/>
        <textarea rows="5" cols="50" value={this.state.script} onChange={this.handleChange}></textarea><br/>
        <button className="upload-script" onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}

module.exports = Upload;