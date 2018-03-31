import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LibraryItem from './LibraryItem';

class PersonalLibrary extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      scripts: [],
      transcripts: [],
      selectedScript: '',
      redirectToSpeechPage: false
    }
    this.fetchScripts = this.fetchScripts.bind(this);
    this.useScript = this.useScript.bind(this);
  }

  componentWillMount() {
    this.fetchScripts();
  }

  fetchScripts() {
    console.log('fetching user library now', this.props);
    axios.post('/api/personalscripts', {
      username: 'buddy',
      userId: 2
    })
    .then((res) => {
      console.log('user library retrieved', res.data);
      this.setState({
        scripts: res.data.scripts,
        transcripts: res.data.transcripts
      });

    })
    .catch((err) => {
       console.log('error retrieving user library', err);
     })
  }

  useScript(e) {
    let index = e.target.value;
    this.props.setscript(this.state.scripts[index].script_text);
  }

  render() {
    let scripts = this.state.scripts || [];
    let transcripts = this.state.transcripts || [];

    return (
      <div>
        <h6>my scripts</h6>
        <div className="collection">
          { scripts.map((script, index) =>
            <div className="card" key={index}>
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src="media/script.png"/>
              </div>
              <div className="card-title activator">
                {script.script_name}
              </div>
              <div className="card-reveal">
              <span className="card-title grey-text text-darken-4">Script Text<i className="material-icons right">close</i></span>
                {script.script_text}
              <span className="card-content grey-text text-darken-4">
                <button value={index} onClick={this.useScript}>Use Script</button>
              </span>
              </div>
            </div>
            )}
        </div>
      </div>
    )
  }
}

module.exports = PersonalLibrary;


