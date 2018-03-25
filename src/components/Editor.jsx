import React from 'react';
import Quill from 'quill';

class Editor extends React.Component {
		constructor(props) {
				super(props);
		}
		
		componentDidMount() {
				var options = {
						debug: 'info',
						theme: 'bubble',
				}
				// let editor = new Quill('#editor', options);
				// this.props.comparison.differences.forEach((phrase) => {
				// 		if (!phrase.added && !phrase.removed) {
				// 				editor.insertText(editor.getLength() - 1, phrase.value, { color: 'black', size: 'large' })
				// 		} else if (phrase.added) {
				// 				editor.insertText(editor.getLength() - 1, phrase.value, { color: 'red', size: 'large' });
				// 		} else if (phrase.removed) {
				// 				editor.insertText(editor.getLength() - 1, phrase.value, { color: 'teal', size: 'large' });
				// 		}
				// })
		}
		render()  {
				const display = {
						display: 'block'
				};
				const hide = {
						display: 'none'
				};
				return( 
						<div id="edit-modal">
								<a className="waves-effect btn cyan accent-4 hoverable modal-trigger" href="#modal-editor"><i className="material-icons left">build</i>Edit Speech</a>
								<div id="modal-editor" className="modal">
										<div className="modal-content">
												<p>Editor</p>
												{/* <div id="editor" /> */}
										</div>
								</div>
						</div >
				)
		}
}
export default Editor;
