import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

import Card from './Card';

export default class ServiceInvokerRequestsPerService extends Component {
    constructor(props) {
        super(props);

        this.state = {
            empty: false,
            loading: true,
            data: {
                labels: [],
                datasets: [

                ]
            }
        }
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_METRICS_BASE_URL + '/services/requests/top?from=2016-06-01')
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
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],
            data: data,
        };
    }

    render() {
        var content;

        if (this.state.empty) {
            content = <div>No failures</div>
        } else {
            content = <Pie data={ this.state.data } options={{responsive: true, legend: { display: false } }} height={ 235 } width={ 600 } />
        }

        return (
            <Card title="# of requests per service" iconCategory="custom" iconName="custom53" loading={ this.state.loading } onRemove={ this.props.onRemove }>
                { content }
            </Card>
        );
    }
}