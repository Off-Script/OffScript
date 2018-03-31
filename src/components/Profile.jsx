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
        <div className="container about">
          <h5>dashboard</h5>

          <div className="row">
            <div className="col s12 m4 l4">
              <h6>profile</h6>
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <img src="media/speaker.png" width="64" height="64" />
                  <p>{this.state.user.username}</p>
                </div>
                <div className="card-action">
                  <a href="#">Contact Me</a>
                </div>
              </div>
              <div className="card">
                <div className="card-image">
                  <img src="media/HenryV.png" width="64" />
                  <div className="card-content">Last script uploaded:</div>
                  <div className="card-action">
                    <Link to={{ pathname: "/speech"}}>Henry V</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col s12 m4 l4">
              <Link to="/upload" className="btn waves-effect black">Upload New Script</Link>
              <PersonalLibrary user={this.state.user} />
            </div>

            <div className="col s12 m4 l4">
              <h6>public library</h6>
              <PublicLibrary user={this.state.user} />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

const ProfileWithRouter = withRouter(Profile);
export default ProfileWithRouter;