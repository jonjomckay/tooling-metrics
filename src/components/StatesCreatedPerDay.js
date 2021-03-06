import React from 'react';
import { Line } from 'react-chartjs-2';

import Card from './Card';
import FetchHelper from '../fetch/FetchHelper';
import ChartHelper from '../charts/ChartHelper';
import ChartMetricComponent from './ChartMetricComponent';

export default class StatesCreatedPerDay extends ChartMetricComponent {
    componentDidMount() {
        FetchHelper.fetch('/states/created/daily?from=2016-11-01')
          .then(response => this.onUpdate(response, ChartHelper.createLineData))
          .catch(this.onError);
    }

    render() {
        var content;

        if (this.state.error) {
            content = <div>{ this.state.error }</div>
        } else {
            content = <Line data={ this.state.data } options={{responsive: true, legend: { display: false }, maintainAspectRatio: false }} />
        }

        return (
          <Card title="# of States created per day" iconCategory="custom" iconName="custom53" loading={ this.state.loading } onRemove={ this.props.onRemove }>
              { content }
          </Card>
        );
    }
}