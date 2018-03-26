import React from 'react';
import Quill from 'quill';

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          script: true
        }
    }
    
    componentDidUpdate() {
        if(this.props.comparison) {
          var options = {
              debug: 'info',
              theme: 'bubble',
          }
          let editor = new Quill('#editor', options);
          this.props.comparison.differences.forEach((phrase) => {
              if (!phrase.added && !phrase.removed) {
                  editor.insertText(editor.getLength() - 1, phrase.value, { color: 'black', size: 'large' })
              } else if (phrase.added) {
                  editor.insertText(editor.getLength() - 1, phrase.value, { color: 'red', size: 'large' });
              } else if (phrase.removed) {
                  editor.insertText(editor.getLength() - 1, phrase.value, { color: 'teal', size: 'large' });
              }
          })
        }
    }

    useTranscript() {
      this.setState({
        script: false
      })
      if(this.props.transcript) {
        editor.setContents({insert: this.props.transcript});
      }
    }

    useScript() {
      this.setState({
        script: true
      })
      if (this.props.script) {
        editor.setContents({ insert: this.props.script });
      }
    }

    render()  {
        return( 
            <div>
                <div id="modal-editor" className="modal">
                    <div className="modal-content">
                        <h4>Edit Your Script</h4>
                        <div id="editor" />
                        {this.state.script ? <button onClick={this.useTranscript}>Go OffScript</button> : <button onClick={this.useScript}>Back</button> }
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Editor;
