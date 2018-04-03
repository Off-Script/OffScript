import React from "react";
import { Radar, Pie, Doughnut, Bar } from "react-chartjs-2";



class Chart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    var data = null;
    let Chartview = null;

    if (this.props.charttype === "radar") {
      data = {
        labels: ["Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Emotional Range"],
        datasets: [
          {
            label: "Script",
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: this.props.scriptdata
          },
          {
            label: "Transcript",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
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
        height={360}/>;

    } else if (this.props.charttype === "doughnut") {
      data = {
        labels: ["correct", "missed"],
        datasets: [{
          data: this.props.data,
          backgroundColor: [
            "#36A2EB",
            "#FF6384",
          ]
        }]
      };
      Chartview =   <Doughnut
        data={data}
        options={{
          maintainAspectRatio: false
        }}
        width={700}
        height={300}/>;

    } else if (this.props.charttype === "pie") {
      data = {
        labels: ["Anger", "Disgust", "Fear", "Joy", "Sadness"],
        datasets: [{
          data: this.props.data,
          backgroundColor: [
            "#9c27b0",
            "#2196f3",
            "#ff5722",
            "#ffeb3b",
            "#4caf50"
          ]
        }]
      };
      Chartview =   <Pie
        data={data}
        options={{
          maintainAspectRatio: false
        }}
        width={700}
        height={300}/>;
    } else if (this.props.charttype === "bar") {
      data = {
        labels: ["Analytical", "Confident", "Tentative"],
        datasets: [{
          label: "Language Tones",
          data: this.props.data,
          backgroundColor: [
            "#ffebee",
            "#e8eaf6",
            "#f1f8e9"
          ]
        }]
      };
      Chartview =   <Bar
        data={data}
        options={{
          maintainAspectRatio: false,
          legend: {
            display: false
          }
        }}
        width={700}
        height={300}/>;
    }

    return (
      <div>
        { Chartview }
      </div>
    );
  }
}

module.exports = Chart;