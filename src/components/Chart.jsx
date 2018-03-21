import React from 'react';
import { Radar } from 'react-chartjs-2';



class Chart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    var data = {
      labels: this.props.labels,
      datasets: [
        {
          label: 'Script',
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: this.props.scriptdata
        },
        {
          label: 'Transcript',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          pointBackgroundColor: 'rgba(255,99,132,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,99,132,1)',
          data: this.props.transdata
        }
      ]
    };
    return (
      <div>
        <Radar
          data={data}
          options={{
            maintainAspectRatio: false
          }}
          width={600}
          height={250}/>
      </div>
    )
  }
}

module.exports = Chart;