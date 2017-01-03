import { Component } from 'react';

export default class TableMetricComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: []
        };
    }

    onError = (error) => {
        this.setState({
            error: error.message,
            loading: false
        });
    };

    onUpdate = (response) => {
        this.setState({
            loading: false,
            data: response
        });
    };
}