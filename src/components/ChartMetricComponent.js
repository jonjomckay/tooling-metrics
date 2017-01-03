import React, { Component } from 'react';
import _ from 'underscore';

export default class ChartMetricComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            empty: false,
            loading: true,
            data: {
                labels: [],
                datasets: []
            }
        }
    }

    onError = (error) => {
        this.setState({
            error: error.message,
            loading: false
        });
    };

    onUpdate = (response, creator) => {
        const tenantGroups = _.groupBy(response, point => point.tenant);

        // Get all the unique labels (names)
        const labels = [ ...new Set(response.map(item => item.name)) ];

        var limitedGroups = _.sample(tenantGroups, 10);

        var data = _.map(limitedGroups, (group, tenant) => {
            return {
                tenant: tenant,
                points: group.map(function (point) {
                    return point.value;
                })
            }
        });

        this.setState({
            empty: !response.length,
            error: null,
            loading: false,
            data: creator(labels, data)
        });
    };

    render() {
        return (
          <div></div>
        );
    }
}