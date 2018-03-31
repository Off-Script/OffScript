import React from "react";
import Speech from "react-speech";

class LineReader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            script: ['This is a default line. How did you get here?', 'This is a second default line. Hello.'],
            line: 'This is a default line. How did you get here?',
            index: 0
        }
        this.advanceLine = this.advanceLine.bind(this);
    }
    
    componentDidMount() {
        if(this.props.script) {
            let script = this.props.script.split(':')
            this.setState({
                script: script,
                line: script[0],
                index: 0
            })
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.script !== prevProps.script) {
            let script = this.props.script.split(':')
            this.setState({
                script: script,
                line: script[0],
                index: 0
            })
        }
    }

    advanceLine() {
        let index = this.state.index;
        index ++;
        this.setState({
            line: this.state.script[index],
            index: index
        })
    }

    render() {
         
        let textstyle = {
            play: {
                hover: {
                backgroundColor: 'white',
                color:'cyan'
                },
                button: {
                padding:'4',
                fontFamily: 'Helvetica',
                fontSize: '1.0em',
                cursor: 'pointer',
                pointerEvents: 'none',
                outline: 'none',
                backgroundColor: 'cyan',
                color: 'white',
                border: 'none'
                },
            }
        }

        return(
            <div>
                <Speech 
                    styles={textstyle}
                    text={this.state.line}
                    textAsButton={true}
                    displayText="Play"
                    voice="Google UK English Female" />
                <button className="waves-effect btn cyan accent-4 hoverable" onClick={this.advanceLine}>
                    <i className="material-icons left">navigate_next</i>Next Line
                </button>
            </div>
        )
    }
}

export default LineReader;