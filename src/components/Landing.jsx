import React from 'react';
import About from './About.jsx';


class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="landing">
        <div className="parallax-container valign-wrapper">
          <div className="container">
            <h3 className="landing-tagline valign white-text">Speak with confidence.</h3>
            <a
              href="/upload"
              className="btn-large tooltipped waves-effect cyan accent-4 hoverable"
              data-position="bottom"
              data-delay="50"
              data-tooltip="Upload a script"
            >Get Started</a>
          </div>
          <div className="parallax"><img src="media/landing.jpg"/></div>
        </div>
        <div className="container info">
          <div className="wrapper info">
            <div className="card-panel hoverable grey lighten-3">
              <i class="large material-icons">insert_drive_file</i>
              <h5>Upload</h5>
              <div className="flow-text">Upload or type a script</div>
            </div>
            <div className="card-panel hoverable grey lighten-3">
              <i class="large material-icons">mic_none</i>
              <h5>Record</h5>
              <div className="flow-text">Transcribe your voice while reciting your script</div>
            </div>
            <div className="card-panel hoverable grey lighten-3">
              <i class="large material-icons">bubble_chart</i>
              <h5>Analytics</h5>
              <div className="flow-text">Visualize real data from IBM Watson</div>
            </div>
            <div className="card-panel hoverable grey lighten-3">
              <i class="large material-icons">record_voice_over</i>
              <h5>Practice</h5>
              <div className="flow-text">Practice again and again to perfect your craft</div>
            </div>
          </div>
        </div>
        <About />
      </div>
    )
  }
}

module.exports = Landing;
