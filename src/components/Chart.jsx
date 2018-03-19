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
      labels: ['Happy', 'Sad', 'Angry', 'Passionate', 'Excited', 'Distressed', 'Confused'],
      datasets: [
        {
          label: 'Script',
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
          label: 'Transcript',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          pointBackgroundColor: 'rgba(255,99,132,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,99,132,1)',
          data: [28, 48, 40, 19, 96, 27, 100]
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
          width="600"
          height="250"/>
      </div>
    )
  }
}

module.exports = Chart;