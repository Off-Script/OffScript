import React from 'react';
import { Radar, Pie, Doughnut } from 'react-chartjs-2';



class Chart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    var data = null;
    let Chartview = null;

    if (this.props.charttype === 'radar') {
      data = {
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
      Chartview =   <Radar
                  data={data}
                  options={{
                    maintainAspectRatio: false
                  }}
                  width={750}
                  height={360}/>
    } else if (this.props.charttype === 'pie') {
      data = {
        labels: ['correct', 'missed'],
        datasets: [{
          data: this.props.score,
          backgroundColor: [
            '#36A2EB',
            '#FF6384',
          ]
        }]
      };
      Chartview =   <Doughnut
                  data={data}
                  options={{
                    maintainAspectRatio: false
                  }}
                  width={700}
                  height={300}/>
    }

    return (
      <div>
        { Chartview }
      </div>
    )
  }
}

module.exports = Chart;