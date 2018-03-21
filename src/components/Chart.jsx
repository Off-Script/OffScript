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
      labels: ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Emotional Range'],
      datasets: [
        {
          label: 'Script',
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: [0.602404, 0.159871, 0.244165, 0.990255, 0.124632]
        },
        {
          label: 'Transcript',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          pointBackgroundColor: 'rgba(255,99,132,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,99,132,1)',
          data: [0.474518, 0.381992, 0.5652, 0.567031, 0.497355]
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