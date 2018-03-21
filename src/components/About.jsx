import React from 'react';

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="card medium about-card">
            <div className="card-content">
              <h5>About Us</h5>
            </div>
            <div className="card-tabs">
              <ul className="tabs">
                <li className="tab"><a href="#ryan">Ryan Morrow</a></li>
                <li className="tab"><a className="active" href="#annah">Annah Patterson</a></li>
                <li className="tab"><a href="#yufan">Yufan Wang</a></li>
              </ul>
            </div>
            <div className="card-content">
              <div id="ryan" className="row">
                <div className="col s12 m6">
                  <img className="responsive-img z-depth-2 avatar" src="https://avatars1.githubusercontent.com/u/4923066?s=400&v=4"/>
                </div>
                <div className="col s12 m6">
                  <h5>Product Owner</h5>
                  <div>
                    <a href="https://github.com/rhmorrow" target="_blank"><img className="logo-link" src="media/github.png"/></a>
                    <a href="https://www.linkedin.com/in/rhmorrow" target="_blank"><img className="logo-link" src="media/linkedin.png"/></a>
                  </div>
                  <p className="flow-text thin-text">"We're actors! We're the OPPOSITE of people!" - Tom Stoppard</p>
                </div>
              </div>
              <div id="annah" className="row">
                <div className="col s12 m6">
                  <img className="responsive-img z-depth-2 avatar" src="https://avatars3.githubusercontent.com/u/22921336?s=460&v=4"/>
                </div>
                <div className="col s12 m6">
                  <h5>Lead Software Engineer</h5>
                  <div>
                    <a href="https://github.com/annahinnyc" target="_blank"><img className="logo-link" src="media/github.png"/></a>
                    <a href="https://www.linkedin.com/in/annahpatterson" target="_blank"><img className="logo-link" src="media/linkedin.png"/></a>
                  </div>
                  <p className="flow-text thin-text">The most damaging phrase in any language is: 'It's always been done that way.' - Grace Hopper</p>
                </div>
              </div>
              <div id="yufan" className="row">
                <div className="col s12 m6">
                  <img className="responsive-img z-depth-2 avatar" src="https://avatars2.githubusercontent.com/u/31011353?s=400&u=4"/>
                </div>
                <div className="col s12 m6">
                  <h5>Scrum Master</h5>
                  <div>
                    <a href="https://github.com/yufanw" target="_blank"><img className="logo-link" src="media/github.png"/></a>
                    <a href="https://www.linkedin.com/in/yufan-wang-web" target="_blank"><img className="logo-link" src="media/linkedin.png"/></a>
                  </div>
                  <p className="flow-text thin-text">Your time is limited, so don't waste it living someone else's life. - Steve Jobs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = About;