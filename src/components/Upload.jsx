import React from "react";
import ReactQuill from "react-quill";
import { Link, Route } from "react-router-dom";
import { Tabs, Tab } from "react-materialize";
import FileUpload from "./FileUpload";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      script: "",
      username: ""
    };
    this.reactQuillRef = null;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clear = this.clear.bind(this);
    this.lineReader = this.lineReader.bind(this);
  }

  componentWillMount() {
    let user = this.props.user;
    if (user) {
      this.setState({
        username: user.username
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.fileLoaded && this.state.script.length > 50) {
      this.props.setscript(this.state.script);
    } else {
      let editor = this.reactQuillRef.getEditor();
      if(editor.getText().length > 50) {
        let script = editor.getText();
        this.setState({script});
        this.props.setscript(script);
        this.clear();
      } else {
        Materialize.toast("For best results, script must be 50 characters or more", 2000);
      }
    }
  }

  lineReader(e) {
    e.preventDefault();
    if(this.state.fileLoaded && this.state.script.length > 50) {
      this.props.setlines(this.state.script);
    } else {
      let editor = this.reactQuillRef.getEditor();
      let text = editor.getText();
      if(text.length < 50) {
        Materialize.toast("For best results, script must be 50 characters or more", 2000);
      } else if( text.split(/.[A-Z]{2,100}[^a-z]/).length <= 1 ) {
        Materialize.toast("For line reader feature, capitalize and separate character names", 4000);
      } else {
        this.setState({script: text});
        this.props.setlines(text);
        this.clear();
      }
    }
  }

  readFile() {
    let fileToLoad = document.getElementById("fileToLoad").files[0];
    let fileReader = new FileReader();
    fileReader.onload = (fileToLoad) => {
      let textFromFileLoaded = fileToLoad.target.result;
      this.setState({
        script: textFromFileLoaded,
        fileLoaded: true
      });
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
  }

  clear() {
    this.setState({
      script: ""
    });
  }

  render() {
    return <div className="container">
      <div className="row">
        <h1 className="cyan-text">Create Script</h1>
      </div>
      <div className="card upload-card">
        <div className="card-tabs">
          <Tabs className='tab tabs-fixed-width transparent'>
            <Tab title="Type a Script" active>
              <br/>
              <ReactQuill ref={el => {
                this.reactQuillRef = el;
              }} theme="snow" value={this.state.script} />
            </Tab>
            <Tab title=" Upload a Script">
              <br/>
              <FileUpload onChange={this.readFile.bind(this)} />
            </Tab>
          </Tabs>
        </div>
      </div>
      <button className="waves-effect btn cyan accent-4 hoverable" onClick={this.handleSubmit}>
        <i className="material-icons left">record_voice_over</i>Speech Analysis
      </button>
      <button className="waves-effect btn cyan accent-4 hoverable" onClick={this.lineReader}>
        <i className="material-icons left">tag_faces</i>Line Reader
      </button>
      <i className="material-icons center cyan-text tooltipped" data-position="top" data-delay="50" data-tooltip="To upload dialogue for the Line Reader, capitalize your character names and separate them with line breaks.">
          help
      </i>
    </div>;
  }
}

module.exports = Upload;