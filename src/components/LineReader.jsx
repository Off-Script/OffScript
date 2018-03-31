import React from "react";
import Speech from "react-speech";

class LineReader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            script: ['Ha, ha, are you honest?', 'My lord?', 'Are you fair?', 'What means your lordship?', 'That if you be honest and fair, your honesty should admit no discourse to your beauty.', 'Could beauty, my lord, have better commerce than with honesty?', 'Ay, truly, for the power of beauty will sooner transform honesty from what it is to a bawd than the force of honesty can translate beauty into his likeness. This was sometime a paradox, but now the time gives it proof. I did love you once.'],
            line: 'Ha, ha, are you honest?',
            index: 0,
            show: true,
            first: true,
            last: false
        }
        this.advanceLine = this.advanceLine.bind(this);
        this.previousLine = this.previousLine.bind(this);
        this.handleShow = this.handleShow.bind(this);
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
        if(this.state.index === 0 && !this.state.first) {
            this.setState({ first: true})
        }
        if(this.state.index === this.state.script.length - 1 && !this.state.last) {
            this.setState({ last: true})
        }
    }

    handleShow(e) {
        e.preventDefault();
        this.setState({
            show: !this.state.show
        })
    }

    advanceLine() {
        let index = this.state.index;
        index ++;
        this.setState({
            line: this.state.script[index],
            index: index,
            first: false
        })
    }

    previousLine() {
        let index = this.state.index;
        index --;
        this.setState({
            line: this.state.script[index],
            index: index,
            last: false
        })
    }

    render() {
        let script = null;
        let lineArray = this.state.script.map((line, index) => <p key={index}> {index%2 + 1}: <Speech 
                            text={line}
                            textAsButton={true}
                            displayText={line}
                            voice="Google UK English Female" /></p>
        )

        if (this.state.show) {
            script = (
                <div>
                <div className="card-content">
                    <h5>Script</h5>
                </div>
                <div className="progress">
                    <div className="determinate"></div>
                </div>
                <div className="card-content script-text">
                    {lineArray}
                </div>
                </div>
            );
        } else {
            script = (
                <div>
                <div className="card-content">
                    <h5 className="grey-text">Script Hidden</h5>
                </div>
                <div className="progress">
                    <div className="determinate"></div>
                </div>
                </div>
            );
        }

        return(
            <div className="container">
                <div className="row">
                    <h1 className="cyan-text">Line Reading</h1>
                </div>
                <div className="row">
                    <div className="col s4">
                        <a
                        className="btn waves-effect cyan accent-4 hoverable"
                        onClick={this.handleShow}
                        >Toggle Script</a>
                        <div className="card grey lighten-4 speech-card">
                        {script}
                        </div>
                    </div>
                     <div className="col s8">
                        <button className="waves-effect btn cyan accent-4 hoverable" disabled={this.state.first} onClick={this.previousLine}>
                            <i className="material-icons left">chevron_left</i>Previous Line
                        </button>
                        <button className="waves-effect btn cyan accent-4 hoverable" disabled={this.state.last} onClick={this.advanceLine}>
                            <i className="material-icons left">chevron_right</i>Next Line
                        </button>
                        <div className="card grey lighten-4 speech-card">
                            <div className="card-content">
                                <h5 className="black-text">Current Prompt</h5>
                            </div>
                            <div className="progress">
                                <div className="determinate"></div>
                            </div>
                            <Speech 
                            text={this.state.line}
                            textAsButton={true}
                            displayText="Play"
                            voice="Google UK English Female" />
                            {this.state.script[this.state.index]}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LineReader;