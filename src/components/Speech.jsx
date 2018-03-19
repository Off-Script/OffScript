import React from 'react';

class Speech extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <button onClick={this.handleSubmit}>Results</button>
      </div>
    )

  }
}

module.exports = Speech;