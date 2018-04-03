import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { withRouter } from "react-router";
import PersonalLibrary from "./PersonalLibrary";
import PublicLibrary from "./PublicLibrary";
import axios from "axios";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  // componentDidMount() {
  //   this.checkSession();
  // }

  checkSession() {
    axios.get("/session")
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
    axios.get("/user")
      .then((user) => {
        console.log("current user is:", user);
        this.setState({
          isLoggedIn: true,
          user: user.data
        });
      })
      .catch((err) => {
        console.log("sign in failed, try again");
      });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col s12 m10">
              <div className="card blue-grey">
                <div className="card-content white-text">
                  <h4>Dashboard</h4>
                  <img src="media/speaker.png" width="32" height="32" />
                  <h4>{this.state.user.username}</h4>
                </div>
              </div>
              <div>
                <a href="/upload" className="btn waves-effect black">Upload New Script</a>
              </div>
              <div className="row">
                <div className="card featured-card z-depth-4">
                  <div className="card-image">
                    <div className="card-content"><h5>Featured Script</h5></div>
                    <img className="featured-img" src="media/HenryV.png" width="64" />
                    <div className="card-action">
                      <Link to={{ pathname: "/speech"}}>Henry V</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col hide-on-small-only m2">
              <ul className="section table-of-contents">
                <li><a href="#scripts">My Scripts</a></li>
                <li><a href="#library">Public Library</a></li>
                <li><a href="#links">External Resources</a></li>
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
              <PublicLibrary setscript={this.props.setscript} user={this.state.user} />
            </div>
          </div>

          <div className="row">
            <div id="links" className="col s10 section scrollspy">
              <h5>External Resources</h5>
              <hr/>
              <div className="collection">
                <a
                  href="https://www.backstage.com/monologues/classical/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="collection-item">Backstage Classical Monologues</a>
                <a
                  href="http://www.theatrehistory.com/plays/oneact.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="collection-item">Theatre History One-Act Plays</a>
                <a
                  href="https://www.genericradio.com/library.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="collection-item">Generic Radio Vintage Scripts Library</a>
                <a
                  href="https://www.toastmasters.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="collection-item">Toastmasters International</a>
              </div>
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