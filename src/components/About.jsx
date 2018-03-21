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
          <div className="card large about-card">
            <div className="card-content">
              <h5>About Us</h5>
            </div>
            <div className="card-tabs">
              <ul className="tabs tabs-fixed-width">
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
                  <h6>Favorite Quote</h6>
                  <blockquote>Text for Ryan</blockquote>
                </div>
              </div>
              <div id="annah" className="row">
                <div className="col s12 m6">
                  <img className="responsive-img z-depth-2 avatar" src="https://avatars3.githubusercontent.com/u/22921336?s=460&v=4"/>
                </div>
                <div className="col s12 m6">
                  <h6>Favorite Quote</h6>
                  <blockquote>Text for Annah</blockquote>
                </div>
              </div>
              <div id="yufan" className="row">
                <div className="col s12 m6">
                  <img className="responsive-img z-depth-2 avatar" src="https://avatars2.githubusercontent.com/u/31011353?s=400&u=4"/>
                </div>
                <div className="col s12 m6">
                  <h6>Favorite Quote</h6>
                  <blockquote>Your time is limited, so don't waste it living someone else's life.</blockquote>
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