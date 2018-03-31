import React from "react";
import Speech from "react-speech";

class LineReader extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div>
                <Speech 
                    text={this.props.script}
                    voice="Google UK English Female" />
            </div>
        )
    }
}

export default LineReader;