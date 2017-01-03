import React from 'react';
import { Pie } from 'react-chartjs-2';

import Card from './Card';
import FetchHelper from '../fetch/FetchHelper';
import ChartHelper from '../charts/ChartHelper';
import ChartMetricComponent from './ChartMetricComponent';

export default class ServiceInvokerFailuresPerService extends ChartMetricComponent {
    componentDidMount() {
        FetchHelper.fetch('/services/failures/top?from=2016-11-01')
          .then(response => this.onUpdate(response, ChartHelper.createPieData))
          .catch(this.onError);
    }

    render() {
        var content;

        if (this.state.error) {
            content = <div>{ this.state.error }</div>
        } else if (this.state.data) {
            content = <Pie data={ this.state.data } options={{ responsive: true, legend: { display: true, position: 'right' } }} />
        }

        return (
          <Card title="# of Service Failures per Service" iconCategory="custom" iconName="custom53" loading={ this.state.loading } onRemove={ this.props.onRemove }>
              { content }
          </Card>
        );
    }
}