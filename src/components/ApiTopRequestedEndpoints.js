import React from "react";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "react-lightning-design-system";

import Card from "./Card";
import FetchHelper from "../fetch/FetchHelper";
import TableMetricComponent from "./TableMetricComponent";

export default class ApiTopRequestedEndpoints extends TableMetricComponent {
    componentDidMount() {
        FetchHelper.fetch('/api/requests/top?limit=8')
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
          <Card title="Top Requested Endpoints" iconCategory="standard" iconName="feed" loading={ this.state.loading }
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