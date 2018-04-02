import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class SaveScriptAnalysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToProfile: false
    }
    this.saveAnalysis = this.saveAnalysis.bind(this);
  }

  saveAnalysis(e) {
    e.preventDefault();
    axios.post('/postanalysis', {
      script: {
        script_text: this.props.script,
        script_emotion: this.props.results.scriptEmotion,
        script_lang: this.props.results.scriptLang,
        script_data: this.props.results.scriptData
      },
      transcript: {
        transcript_text: this.props.transcript,
        transcript_emotion: this.props.results.transEmotion,
        transcript_lang: this.props.results.transLang,
        transcript_data: this.props.results.transData
      },
      scoreData: this.props.scoreData,
      comparison: this.props.comparison,
      currentUserId: this.props.userId
    })
    .then((res) => {
      console.log('analysis saved to db', res);
      this.setState({
        redirectToProfile: true
      });
    })
    .catch((err) => {
       console.log('error saving analysis to db', err);
     })
  }

  render() {
    const redirectToProfile = this.state.redirectToProfile;
    if (redirectToProfile) {
      return(<Redirect to={{ pathname: '/profile'}}/>)
    }
    return (
      <div id="myAccount">
        <div className="modal-footer transparent">
          <a className="btn waves-effect black" onClick={this.saveAnalysis}>Save Analysis</a>
        </div>
      </div>
    )
  }

}

module.exports = SaveScriptAnalysis;