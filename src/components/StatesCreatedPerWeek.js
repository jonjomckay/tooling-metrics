import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

import Card from './Card';

export default class StatesCreatedPerWeek extends Component {
    constructor(props) {
        super(props);

        this.state = {
            empty: false,
            loading: true,
            data: {
                labels: [],
                datasets: []
            }
        }
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_METRICS_BASE_URL + '/states/created/weekly?from=2016-01-01')
          .then(response => response.json())
          .then(data => {
              var labels = data.map(function (point) {
                  return point.name;
              });

              var datasetData = data.map(function (point) {
                  return point.value;
              });

              this.setState({
                  empty: data.length ? false : true,
                  loading: false,
                  data: {
                      labels: labels,
                      datasets: [
                          this.createDataset(datasetData)
                      ]
                  }
              });
          });
    }

    createDataset(data) {
        return {
            fillColor: '#F1E7E5',
            strokeColor: '#E8575A',
            pointColor: '#E8575A',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#ff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data: data,
        };
    }

    render() {
        var content;

        if (this.state.empty) {
            content = <div>No requests</div>
        } else {
            content = <Bar data={ this.state.data } options={{responsive: true, legend: { display: false } }} height={ 235 } width={ 600 } />
        }

        return (
          <Card title="# of failures per week" iconCategory="custom" iconName="custom53" loading={ this.state.loading } onRemove={ this.props.onRemove }>
              { content }
          </Card>
        );
    }
}