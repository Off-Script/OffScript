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
        <br></br>
        <div className="container">
          <div className="parallax-container highlight valign-wrapper">
            <div className="container">
              <h3 className="valign cyan-text">Get OffScript</h3>
              <div className="cyan-text flow-text">Write a speech, upload a document on your computer, or practice from our free and open Library of famous works. We'll track your accuracy and show you what sections to work on.</div>
            </div>
            <div className="parallax"><img src="media/work.jpg" /></div>
          </div>
        </div>
        <br></br>
        <div className="container">
          <div className="parallax-container highlight valign-wrapper">
            <div className="container">
              <h3 className="valign white-text">Go OffScript</h3>
                <div className="white-text flow-text">Sometimes an unscripted moment can make your speech shine. With tone analytics from Watson, you can compare your performance to your original script and make changes on the fly</div>
            </div>
            <div className="parallax"><img src="media/stage.jpg" /></div>
          </div>
        </div>
        <br></br>
        <div className="container">
          <div className="parallax-container highlight valign-wrapper">
            <div className="container">
              <h3 className="valign black-text">Stay OffScript</h3>
              <div className="black-text flow-text">Practice makes perfect. With a free OffScript account, you'll be ready to edit and save scripts so you can track your improvement over time.</div>
              <a className="btn waves-effect cyan hoverable modal-trigger" href="#modal-login">Login / Signup</a>
            </div>
            <div className="parallax"><img src="media/openbook.jpg" /></div>
          </div>
        </div>
        <About />
      </div>
    )
  }
}

module.exports = Landing;
