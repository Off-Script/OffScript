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
              <div>Your Profile</div>
            </div>
          } />
        </Switch>
      </div>
    )
  }
}

const ProfileWithRouter = withRouter(Profile);
export default ProfileWithRouter;