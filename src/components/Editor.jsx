import React from 'react';
import ReactQuill from 'react-quill';

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          editor: false,
          script: true,
          text: {}
        }
      this.useScript = this.useScript.bind(this);
      this.useTranscript = this.useTranscript.bind(this);
      this.submit = this.submit.bind(this);
      this.reactQuillRef = null;
    }

    ComponentDidUpdate(prevProps, prevState) {
      if(this.props.comparison !== prevProps.comparison) {
        this.useScript();
      }
    }

    useTranscript() {
      this.setState({
        script: false
      })
      let delta = []
      this.props.comparison.differences.forEach((phrase) => {
        if(!phrase.removed && !phrase.added) { delta.push({insert: phrase.value, attributes: {size: "large"}})}
        if (phrase.added) { delta.push({ insert: phrase.value, attributes: { size: "large", color: "#e01d00"}})}
      })
      this.setState({
        text: delta
      })
    }

    useScript() {
      this.setState({
        script: true
      })
      let delta = []
      this.props.comparison.differences.forEach((phrase) => {
        if (!phrase.removed && !phrase.added) { delta.push({ insert: phrase.value , attributes: { size: "large"}}) }
        if (phrase.removed) {
          delta.push({
            insert: phrase.value, attributes: { size: "large", color: "#60dfff" } }) }
      })
      this.setState({
        text: delta
      })
    }

    submit() {
      this.setState({
        script: true
      })
      let script = this.reactQuillRef.getEditor().getText();
      this.props.setscript(script);
    }

    render()  {
        return(
            <div>
                <div id="modal-editor" className="modal">
                    <div className="modal-content">
                        <h4>Edit Your Script</h4>
                        <ReactQuill
                          ref={(el) => { this.reactQuillRef = el }}
                          theme="bubble"
                          value={this.state.text}/>
                {this.state.script ? <button className="waves-effect btn cyan accent-4 hoverable" onClick={this.useTranscript}>Go OffScript</button> : <button className="waves-effect btn cyan accent-4 hoverable" onClick={this.useScript}>Back</button> }
                <button onClick={this.submit} className="modal-action modal-close waves-effect btn cyan accent-4 hoverable">Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Editor;
