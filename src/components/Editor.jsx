import React from 'react';

class Editor extends React.Component {
		constructor(props) {
        super(props);
        console.log('in modal')
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
										</div>
								</div>
						</div >
				)
		}
}
export default Editor;
