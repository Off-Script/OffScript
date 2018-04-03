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
            <h3 className="landing-tagline valign white-text animated bounceIn">Speak with confidence.</h3>
            <a
              href="/upload"
              className="animated fadeInUpBig btn-large tooltipped waves-effect cyan accent-4 hoverable"
              data-position="bottom"
              data-delay="50"
              data-tooltip="Upload a script"
            >Get Started</a>
          </div>
          <div className="parallax"><img src="media/landing.jpg"/></div>
        </div>
        <br></br>
        <div className="container wow fadeInLeftBig">
          <div className="parallax-container highlight valign-wrapper z-depth-4">
            <div className="container">
              <h3 className="valign landing-text cyan-text">Get OffScript</h3>
              <div className="landing-text cyan-text flow-text">
                Write a speech, upload a document from your computer, or practice from our free and open Library of famous works. We'll listen to you, 
                track your accuracy, and show you what sections to work on.
              </div>
            </div>
            <div className="parallax"><img src="media/work.jpg" /></div>
          </div>
        </div>
        <br></br>
        <div className="container wow fadeInRightBig">
          <div className="parallax-container highlight valign-wrapper z-depth-4">
            <div className="container">
              <h3 className="valign landing-text white-text">Go OffScript</h3>
              <div className="landing-text white-text flow-text">
                Sometimes an unscripted moment can make your speech shine. With tone analytics from Watson, 
                you can compare your performance to your original script and make changes as you improvise.
              </div>
            </div>
            <div className="parallax"><img src="media/stage.jpg" /></div>
          </div>
        </div>
        <br></br>
        <div className="container wow fadeInLeftBig">
          <div className="parallax-container highlight valign-wrapper z-depth-4">
            <div className="container">
              <h3 className="valign landing-text black-text">Stay OffScript</h3>
              <div className="landing-text black-text flow-text">
                Practice makes perfect. With a free OffScript account, 
                you'll be ready to edit and save your scripts practice again and again.
              </div>
              <a className="btn waves-effect cyan hoverable modal-trigger" href="#modal-login">Login / Signup</a>
            </div>
            <div className="parallax"><img src="media/leaves.jpg" /></div>
          </div>
        </div>
        <br/>
        <About />
      </div>
    );
  }
}

module.exports = Landing;
