import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "react-lightning-design-system";

import Card from './Card';
import TableMetricComponent from './TableMetricComponent';
import FetchHelper from '../fetch/FetchHelper';

export default class ServiceInvokerRequestsPerService extends TableMetricComponent {
    componentDidMount() {
        FetchHelper.fetch('/services/requests/top?from=2016-11-01')
          .then(this.onUpdate)
          .catch(this.onError);
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
          <Card title="# of Service Requests per Service" iconCategory="standard" iconName="feed" loading={ this.state.loading }
                onRemove={ this.props.onRemove }>
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