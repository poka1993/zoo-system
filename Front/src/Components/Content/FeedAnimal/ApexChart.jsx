import React, { Component } from "react";
import Chart from "react-apexcharts";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
              
          };
          
        }

        

  render() {
    let series = this.props.series;
    let options = {
      chart: {
        width: '100%',
        type: 'pie',
      },
      labels: this.props.labels,
      theme: {
        monochrome: {
          enabled: true
        }
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -5
          }
        }
      },
      title: {
        text: "Zestawienie podawanego pokarmu"
      },
      dataLabels: {
        formatter(val, opts) {
          const name = opts.w.globals.labels[opts.seriesIndex]
          return [name, val.toFixed(1) + '%']
        }
      },
      legend: {
        show: false
      }
    }

    return (
      <div className="app">
        <div className="row">
          <div className="mt-1 mixed-chart">
            {this.props.series ?
            <Chart
              options={options}
              series={series}
              type="pie"
              width="350"
            /> :
            null }
          </div>
        </div>
      </div>
    );
  }
}

export default App;