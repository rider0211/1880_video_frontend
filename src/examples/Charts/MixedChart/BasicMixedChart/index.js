/** 

=========================================================
* Vision UI PRO React - v1.0.0
=========================================================


* Copyright 2021 Creative Tim (https://www.creative-tim.com/)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Visionware.

*/

import React, { Component } from "react";

import Chart from "react-apexcharts";

class BasicMixedChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    const { mixedChartData, mixedChartOptions } = this.props;

    this.setState({
      chartData: mixedChartData,
      chartOptions: mixedChartOptions,
    });
  }

  render() {
    return (
      <Chart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="line"
        width="100%"
        height="100%"
      />
    );
  }
}

export default BasicMixedChart;
