import React, { Component } from "react";
import update from 'react-addons-update';
import { GridStack, GridStackItem } from 'react-gridstack';
import { Button, Container, Grid, Row, util } from 'react-lightning-design-system';

import AddWidgetModal from './components/AddWidgetModal';
import ApiTopRequestedEndpoints from './components/ApiTopRequestedEndpoints';
import ServiceInvokerFailuresPerMonth from './components/ServiceInvokerFailuresPerMonth';
import ServiceInvokerFailuresPerService from './components/ServiceInvokerFailuresPerService';
import ServiceInvokerRequestsPerMonth from './components/ServiceInvokerRequestsPerMonth';
import ServiceInvokerRequestsPerService from './components/ServiceInvokerRequestsPerService';
import StatesCreatedPerDay from './components/StatesCreatedPerDay';
import StatesCreatedPerWeek from './components/StatesCreatedPerWeek';
import StatesCreatedPerMonth from './components/StatesCreatedPerMonth';

import '@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css';
import 'react-gridstack/dist/react-gridstack.css';
import "./App.css";

// Set the location of the Lightning icons
util.setAssetRoot('/static');

const componentMap = [
    {
        section: 'API',
        component: ApiTopRequestedEndpoints,
        id: 'ApiTopRequestedEndpoints',
        title: 'Top requested endpoints'
    },
    {
        section: 'Service Invoker',
        component: ServiceInvokerFailuresPerMonth,
        id: 'ServiceInvokerFailuresPerMonth',
        title: '# of failures per month'
    },
    {
        section: 'Service Invoker',
        component: ServiceInvokerFailuresPerService,
        id: 'ServiceInvokerFailuresPerService',
        title: '# of failures per service'
    },
    {
        section: 'Service Invoker',
        component: ServiceInvokerRequestsPerMonth,
        id: 'ServiceInvokerRequestsPerMonth',
        title: '# of requests per month'
    },
    {
        section: 'Service Invoker',
        component: ServiceInvokerRequestsPerService,
        id: 'ServiceInvokerRequestsPerService',
        title: '# of requests per service'
    },
    {
        section: 'States',
        component: StatesCreatedPerDay,
        id: 'StatesCreatedPerDay',
        title: '# of States created per day'
    },
    {
        section: 'States',
        component: StatesCreatedPerWeek,
        id: 'StatesCreatedPerWeek',
        title: '# of States created per week'
    },
    {
        section: 'States',
        component: StatesCreatedPerMonth,
        id: 'StatesCreatedPerMonth',
        title: '# of States created per month'
    }
];

class App extends Component {
    constructor() {
        super();

        this.state = {
            widgetModalOpen: false,
            items: []
        };
    }

    componentWillMount = () => {
        var layout = localStorage.getItem('metrics.widgets.layout');
        if (layout) {
            this.setState({
                items: JSON.parse(layout)
            });
        }
    };

    onGridChange = (event, items) => {
        var stateItems = this.state.items.map(item => {
            var updatedItem = items.find(i => i.id === item.id);
            if (updatedItem) {
                return Object.assign(item, {
                    id: updatedItem.id,
                    height: updatedItem.height,
                    width: updatedItem.width,
                    x: updatedItem.x,
                    y: updatedItem.y
                });
            }

            return item;
        });

        localStorage.setItem('metrics.widgets.layout', JSON.stringify(stateItems));

        this.setState({
            items: stateItems
        });
    };

    createWidget = (id) => {
        var widget = componentMap.find(c => c.id === id);
        if (widget) {
            return React.createElement(widget.component, {
                onRemove: this.onWidgetRemove
            });
        }

        return <div>Unknown widget</div>;
    };

    toggleAddWidgetOpened = () => {
        this.setState({
            widgetModalOpen: !this.state.widgetModalOpen
        });
    };

    onWidgetAdd = (widget) => {
        var item = {
            autoPosition: false,
            id: widget.id,
            height: 4,
            width: 4,
            x: 0,
            y: 0
        };

        this.setState(update(this.state, {
            items: {
                $push: [item]
            }
        }));
    };

    onWidgetRemove = (widget) => {
        var itemIndex = this.state.items.findIndex(i => i.id === widget.id);

        this.setState({
            items: update(this.state.items, { $splice: [[ itemIndex, 1 ]] })
        });
    };

    render() {
        var items = this.state.items.map(item => {
            return (
              <GridStackItem key={ item.id } id={ item.id } height={ item.height } width={ item.width } x={ item.x } y={ item.y } autoPosition={ item.autoPosition || false }>
                  { this.createWidget(item.id) }
              </GridStackItem>
            );
        });

        return (
            <Container size="x-large" align="center">
                <Grid>
                    <Row className="slds-p-horizontal--small slds-p-top--small">
                        <Button type="brand" onClick={ this.toggleAddWidgetOpened }>Add Widget</Button>
                    </Row>

                    <Row className="slds-p-vertical--small">
                        <GridStack cellHeight={ 50 } onChange={ this.onGridChange }>
                            { items }
                        </GridStack>
                    </Row>

                    <Row>
                        <AddWidgetModal
                          opened={ this.state.widgetModalOpen }
                          components={ componentMap }
                          items={ this.state.items }
                          onToggleOpened={ this.toggleAddWidgetOpened }
                          onWidgetAdd={ this.onWidgetAdd }
                          onWidgetRemove={ this.onWidgetRemove }
                        />
                    </Row>
                </Grid>
            </Container>
        );
    }
}

export default App;
