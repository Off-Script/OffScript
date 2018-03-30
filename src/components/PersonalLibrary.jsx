import React from 'react';


class PersonalLibrary extends React.Component{
  constructor(props) {
    super(props);
  }


  fetchScripts(e) {
    console.log('fetching user library now');
    e.preventDefault();
    axios.post('/login', {
      username: this.state.username,
      password: this.state.password
    })
    .then((res) => {
      console.log('handling login submit', res);
      this.setState({
        isLoggedIn: true,
        redirectToProfile: true,
        user: res.data.user
      });
      this.props.setUserInSession(res.data.user);
    })
    .catch((err) => {
       console.log('error handling login submit', err);
      this.setState({
        errors: error.response.data.errors,
        isLoggedIn: false,
        redirectToProfile: false
      });
     })
  }

  render() {
    return (
      <div>
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
    )
  }
}

module.exports = PersonalLibrary;


