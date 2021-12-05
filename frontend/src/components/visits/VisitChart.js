import React, { Component } from "react";
import PropTypes from "prop-types";
import Chart from "react-google-charts";

class VisitChart extends Component {
  render() {
    return (
      <div>
        <Chart
          width='100%'
          height='250px'
          chartType={this.props.area ? 'AreaChart' : 'LineChart'}
          loader={<div>Loading Chart</div>}
          data={this.props.data}
          options={{
            hAxis: {
              title: this.props.hAxisTitle,
            },
            vAxis: {
              title: this.props.vAxisTitle,
            },
            legend: { position: 'bottom', maxLines: 3 },
            // For the legend to fit, we make the chart area smaller
            // chartArea: { width: '50%', height: '70%' },
          }}
        />
      </div>
    );
  }
};

VisitChart.propTypes = {
  hAxisTitle: PropTypes.string,
  vAxisTitle: PropTypes.string,
  area: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired
};

export default VisitChart;