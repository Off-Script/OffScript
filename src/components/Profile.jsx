import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PersonalLibrary from './PersonalLibrary';
import PublicLibrary from './PublicLibrary';
import axios from 'axios';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    this.checkSession();
  }

  checkSession() {
    axios.get('/session')
      .then((response) => {
        this.login();
      })
      .catch((err) => {
        this.setState({
          isLoggedIn: false,
          user: {}
        });
      });
  }

  login() {
    axios.get('/user')
      .then((user) => {
        console.log('current user is:', user);
        this.setState({
          isLoggedIn: true,
          user: user.data
        });
      })
      .catch((err) => {
        console.log('sign in failed, try again');
      });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col s12 m10">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <h4>Dashboard</h4>
                  <img src="media/speaker.png" width="64" height="64" />
                  <h4>{this.state.user.username}</h4>
                </div>
              </div>
              <div className="row">
                <div className="card col s7">
                  <div className="card-image">
                    <div className="card-content"><h5>Recent Script</h5></div>
                    <img src="media/HenryV.png" width="64" />
                    <div className="card-action">
                      <Link to={{ pathname: "/speech"}}>Henry V</Link>
                    </div>
                  </div>
                </div>
                <div className="col s5">
                  <a href="/upload" className="btn waves-effect black">Upload New Script</a>
                </div>
              </div>
            </div>
            <div className="col hide-on-small-only m2">
              <ul className="section table-of-contents">
                <li><a href="#scripts">My Scripts</a></li>
                <li><a href="#library">Public Library</a></li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div id="scripts" className="col s10 section scrollspy">
              <PersonalLibrary setscript={this.props.setscript} user={this.state.user} />
            </div>
          </div>

          <div className="row">
            <div id="library" className="col s10 section scrollspy">
              <h6>public library</h6>
              <PublicLibrary setscript={this.props.setscript} user={this.state.user} />
            </div>
          </div>

          <div className="fixed-action-btn">
            <a className="btn-floating btn-large red">
              <i className="large material-icons">mode_edit</i>
            </a>
            <ul>
              <li><a href="/upload" className="btn-floating green"><i className="material-icons">publish</i></a></li>
            </ul>
          </div>

        </div>
      </div>
    );
  }
}

const ProfileWithRouter = withRouter(Profile);
export default ProfileWithRouter;