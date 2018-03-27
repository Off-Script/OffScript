import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="container about">
          <h5>my account</h5>
          <div className="row">
            <div className="col s12 m4 l4">
              <h6>last script uploaded</h6>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>

            <div className="col s12 m4 l4">
              <Link to="/upload" className="btn waves-effect black">Upload New Script</Link>
              <h6>my scripts</h6>
              <ul className="collapsible">
                <li className="active">
                  <div className="collapsible-header"><i className="mdi-av-web"></i>Hamlet</div>
                  <div className="collapsible-body"><p>transcript</p></div>
                  <div className="collapsible-body"><p>recording</p></div>
                </li>
                <li>
                  <div className="collapsible-header"><i className="mdi-editor-format-align-justify"></i>King John</div>
                  <div className="collapsible-body"><p>transcript</p></div>
                  <div className="collapsible-body"><p>recording</p></div>
                </li>
                <li>
                  <div className="collapsible-header"><i className="mdi-av-play-shopping-bag"></i>Arcadia</div>
                  <div className="collapsible-body"><p>transcript</p></div>
                  <div className="collapsible-body"><p>recording</p></div>
                </li>
                <li>
                  <div className="collapsible-header"><i className="mdi-editor-insert-comment"></i>Betrayal</div>
                  <div className="collapsible-body"><p>transcript</p></div>
                  <div className="collapsible-body"><p>recording</p></div>
                </li>
              </ul>
            </div>

            <div className="col s12 m4 l4">
              <h6>profile</h6>
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <img src="media/speaker.png" width="64" height="64" />
                  <p>{this.props.location.state}</p>
                </div>
                <div className="card-action">
                  <a href="#">Contact Me</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

const ProfileWithRouter = withRouter(Profile);
export default ProfileWithRouter;