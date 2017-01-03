import React from 'react';
import { Line } from 'react-chartjs-2';

import Card from './Card';
import ChartMetricComponent from './ChartMetricComponent';
import FetchHelper from '../fetch/FetchHelper';
import ChartHelper from '../charts/ChartHelper';

export default class ServiceInvokerFailuresPerMonth extends ChartMetricComponent {
    componentDidMount() {
        FetchHelper.fetch('/services/failures/monthly?from=2016-09-01')
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
          <Card title="# of Service Failures per month" iconCategory="custom" iconName="custom53" loading={ this.state.loading } onRemove={ this.props.onRemove }>
              { content }
          </Card>
        );
    }
}