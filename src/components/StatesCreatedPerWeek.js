import React from 'react';
import { Bar } from 'react-chartjs-2';

import Card from './Card';
import ChartMetricComponent from './ChartMetricComponent';
import FetchHelper from '../fetch/FetchHelper';
import ChartHelper from '../charts/ChartHelper';

export default class StatesCreatedPerWeek extends ChartMetricComponent {
    componentDidMount() {
        FetchHelper.fetch('/states/created/weekly?from=2016-11-01')
          .then(response => this.onUpdate(response, ChartHelper.createBarData))
          .catch(this.onError);
    }

    render() {
        let content;

        if (this.state.error) {
            content = <div>{ this.state.error }</div>
        } else {
            content = <Bar data={ this.state.data } options={{responsive: true, legend: { display: false }, maintainAspectRatio: false }} />
        }

        return (
          <Card title="# of States created per week" iconCategory="custom" iconName="custom53" loading={ this.state.loading } onRemove={ this.props.onRemove }>
              { content }
          </Card>
        );
    }
}