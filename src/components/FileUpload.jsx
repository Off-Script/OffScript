import React from 'react';

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <form action="#">
          <div class="file-field input-field">
            <div class="btn">
              <span>File</span>
              <input type="file" id="fileToLoad" onChange={this.props.onChange} />
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text" placeholder="Upload a text file" />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

module.exports = FileUpload;