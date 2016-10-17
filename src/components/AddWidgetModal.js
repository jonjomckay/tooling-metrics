import React, { Component } from 'react';
import { Button, Col, Grid, Modal, Row } from 'react-lightning-design-system';
import _ from 'underscore';

class AddWidgetModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            components: [],
            items: [],
            opened: false
        }
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            components: nextProps.components,
            items: nextProps.items,
            opened: nextProps.opened
        });
    };

    isWidgetSelected = (widget) => {
        return !!this.state.items.find(i => i.id === widget.id);
    };

    onSelection = (widget) => {
        if (this.isWidgetSelected(widget)) {
            this.props.onWidgetRemove(widget);
        } else {
            this.props.onWidgetAdd(widget);
        }
    };

    render() {
        var widgets = _.chain(this.state.components)
          .groupBy(function (widget) {
              return widget.section;
          })
          .map((section, name) => {
              var sectionWidgets = _.map(section, (widget) => {
                  var type = this.isWidgetSelected(widget) ? 'brand' : 'neutral';

                  return (
                    <Col key={ widget.id } className="slds-p-horizontal--small slds-p-vertical--xx-small slds-size--1-of-2" noFlex>
                        <Button type={ type } className="slds-size--2-of-2" onClick={ () => this.onSelection(widget) }>{ widget.title }</Button>
                    </Col>
                  );
              });

              return (
                <div key={ name }>
                    <h3 className="slds-section-title--divider">{ name }</h3>

                    <Grid className="slds-m-vertical--x-small">
                        <Row pullPadded>
                            { sectionWidgets }
                        </Row>
                    </Grid>
                </div>
              )
          })
          .value();

        return (
          <Modal opened={ this.state.opened } onHide={ this.props.onToggleOpened }>
              <Modal.Header title="Choose a widget" closeButton />

              <Modal.Content className="slds-p-around--medium">
                  { widgets }
              </Modal.Content>
          </Modal>
        );
    }
}

AddWidgetModal.propTypes = {
    components: React.PropTypes.array.isRequired,
    items: React.PropTypes.array.isRequired,
    onToggleOpened: React.PropTypes.func.isRequired,
    onWidgetAdd: React.PropTypes.func.isRequired,
    onWidgetRemove: React.PropTypes.func.isRequired
};

export default AddWidgetModal;