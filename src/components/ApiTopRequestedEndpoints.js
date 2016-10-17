import React, { Component } from "react";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "react-lightning-design-system";

import Card from './Card';

export default class ApiTopRequestedEndpoints extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: []
        };
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_METRICS_BASE_URL + '/api/requests/top?limit=8')
          .then(response => response.json())
          .then(data => {
            this.setState({
                loading: false,
                data: data
            });
        });
    }

    render() {
        var endpoints = this.state.data.map(function (endpoint) {
            return (
              <TableRow key={ endpoint.name }>
                  <TableRowColumn>{ endpoint.name }</TableRowColumn>
                  <TableRowColumn>{ endpoint.value }</TableRowColumn>
              </TableRow>
            );
        });

        return (
            <Card title="Top Requested Endpoints" iconCategory="standard" iconName="feed" loading={ this.state.loading } onRemove={ this.props.onRemove }>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>URL</TableHeaderColumn>
                            <TableHeaderColumn>#</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        { endpoints }
                    </TableBody>
                </Table>
            </Card>
        );
    }
}