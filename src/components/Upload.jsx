import React from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      script: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clear = this.clear.bind(this);
  }

  handleChange(e) {
    this.setState({
      script: e.target.value
    });
  }

  handleSubmit(e) {
    // e.preventDefault();
    // axios.post('/api/script', {
    //   script: this.state.script
    // })
    // .then((res) => {
      this.props.setscript(this.state.script);
      this.clear();
    // })
    // .catch((err) => {
    //   console.log(err);
    // })
  }

  clear() {
    this.setState({
      script: ''
    });
  }

  render() {
    return (
      <div className="container">
        <div class="input-field upload">
          <i class="material-icons prefix">mode_edit</i>
          <textarea autofocus id="icon_prefix2" class="materialize-textarea" value={this.state.script} onChange={this.handleChange}></textarea>
          <label for="icon_prefix2">Script</label>
        </div>
        <Link to="/speech">
          <a class="waves-effect btn cyan accent-4 hoverable" onClick={this.handleSubmit}><i class="material-icons left">file_upload</i>Upload</a>
        </Link>
      </div>
    )
  }
}

module.exports = Upload;
