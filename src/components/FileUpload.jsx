import React from 'react';

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <form action="#">
          <div className="file-field input-field">
            <div className="waves-effect btn cyan accent-4 hoverable">
              <span>File</span>
              <input type="file" id="fileToLoad" onChange={this.props.onChange} />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" placeholder="Upload a text file" />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

module.exports = FileUpload;