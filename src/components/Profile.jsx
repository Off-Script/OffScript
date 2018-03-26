import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/profile" render={ () =>
            <div>
              <div class="container about">
                <h5>my account</h5>
                <div class="row">
                  <div class="col s12 m4 l4">
                    <h6>last script uploaded</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  </div>

                  <div class="col s12 m4 l4">
                    <h6>my scripts</h6>
                    <ul class="collapsible">
                      <li class="active">
                        <div class="collapsible-header"><i class="mdi-av-web"></i>Hamlet</div>
                        <div class="collapsible-body"><p>transcript</p></div>
                        <div class="collapsible-body"><p>recording</p></div>
                      </li>
                      <li>
                        <div class="collapsible-header"><i class="mdi-editor-format-align-justify"></i>King John</div>
                        <div class="collapsible-body"><p>transcript</p></div>
                        <div class="collapsible-body"><p>recording</p></div>
                      </li>
                      <li>
                        <div class="collapsible-header"><i class="mdi-av-play-shopping-bag"></i>Arcadia</div>
                        <div class="collapsible-body"><p>transcript</p></div>
                        <div class="collapsible-body"><p>recording</p></div>
                      </li>
                      <li>
                        <div class="collapsible-header"><i class="mdi-editor-insert-comment"></i>Betrayal</div>
                        <div class="collapsible-body"><p>transcript</p></div>
                        <div class="collapsible-body"><p>recording</p></div>
                      </li>
                    </ul>
                  </div>

                  <div class="col s12 m4 l4">
                    <h6>profile</h6>
                    <div class="card blue-grey darken-1">
                      <div class="card-content white-text">
                        <img src="media/speaker.png" width="64" height="64" />
                        <p>{this.props.location.state}</p>
                      </div>
                      <div class="card-action">
                        <a href="#">Contact Me</a>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          } />
        </Switch>
      </div>
    )
  }
}

const ProfileWithRouter = withRouter(Profile);
export default ProfileWithRouter;