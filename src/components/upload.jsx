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
    console.log('e.target.val', e.target.value);
    this.setState({
      script: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.script);

    let data = {
      script_text: this.state.script
    };

    let request = new Request('http://localhost:3000/api/script', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json'}),
      body: JSON.stringify(data)
    });

    // xmlhttprequest()
    console.log('request', request);
    fetch(request)
      .then((response) => {
        console.log('response', response);
        response.json()
          .then((data) => {
            console.log('script posted to database:', data);
          });
      });

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