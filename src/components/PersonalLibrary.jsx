import React from 'react';
import axios from 'axios';
import LibraryItem from './LibraryItem';

class PersonalLibrary extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      scripts: [],
      transcripts: []
    }
    this.fetchScripts = this.fetchScripts.bind(this);
  }

  componentDidMount() {
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

  render() {
    let scripts = this.state.scripts || [];
    let transcripts = this.state.transcripts || [];

    return (
      <div>
        <h6>my scripts</h6>
        <ul className="collapsible">
          {scripts.map((script, index)=> {
            return <LibraryItem key={index} script={script} />
          })}
        </ul>
      </div>
    )
  }
}

module.exports = PersonalLibrary;


