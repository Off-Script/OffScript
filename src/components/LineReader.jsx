import React from "react";
import Speech from "react-speech";

class LineReader extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div>
                <Speech text="test speech. hello world!" />
            </div>
        )
    }
}

export default LineReader;