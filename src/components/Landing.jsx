import React from "react";
import About from "./About.jsx";

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
            <h3 className="landing-tagline valign white-text animated zoomIn">Speak with confidence.</h3>
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
        <div className="container wow fadeInUp">
          <div className="parallax-container highlight valign-wrapper z-depth-4">
            <div className="container">
              <h3 className="valign landing-text white-text">Get OffScript</h3>
              <div className="landing-text flow-text white-text">
                Compose a script, upload one, or choose from our library of famous works. 
                Upload a scene and OffScript will be on book for you,
                helping you practice monologues and scenes alike.
              </div>
            </div>
            <div className="parallax"><img src="media/work.jpg" /></div>
          </div>
        </div>
        <br></br>
        <div className="container wow fadeInRight">
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
        <div className="container wow fadeInLeft">
          <div className="parallax-container highlight valign-wrapper z-depth-4">
            <div className="container">
              <h3 className="valign landing-text white-text">Stay OffScript</h3>
              <div className="landing-text flow-text white-text">
                Practice makes perfect. With a free OffScript account, 
                you'll be ready to edit and save your scripts to practice again and again.
              </div>
              <a className="btn waves-effect cyan hoverable modal-trigger" href="#modal-login">Login / Signup</a>
            </div>
            <div className="parallax"><img src="media/books.jpg" /></div>
          </div>
        </div>
        <br/>
        <About />
      </div>
    );
  }
}

module.exports = Landing;
