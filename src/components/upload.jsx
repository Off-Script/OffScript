import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      script: 'Enter Script Here'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clear = this.clear.bind(this);
  }

  handleChange(e) {
    console.log('e.target.val', e.target.value);
    this.setState({
      script: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/api/script', {
      script: this.state.script
    })
    .then((res) => {
      console.log(res);
      this.clear()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  clear() {
    this.setState({
      script: 'Enter Script Here'
    });
  }

  render() {
    return (
      <div>
        Script:<br/>
        <textarea rows="5" cols="40" value={this.state.script} onChange={this.handleChange}></textarea><br/>
        <button className="upload-script" onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}

module.exports = Upload;