import React, { Component } from 'react';
import { Button, Icon } from 'react-lightning-design-system';

import LoadingSpinner from './LoadingSpinner';

class Card extends Component {
    render() {
        var content = this.props.children;
        if (!this.props.children) {
            content = <div>No data</div>
        }

        if (this.props.loading) {
            content = <LoadingSpinner />
        }

        var icon = this.props.iconCategory
          ? <div className="slds-media__figure"><Icon category={ this.props.iconCategory } icon={ this.props.iconName } size="small" /></div>
          : <span />;

        return (
          <article className="slds-card" style={{ display: 'flex', flex: '1', 'flex-direction': 'column', height: '100%' }}>
              <div className="slds-card__header slds-grid">
                  <header className="slds-media slds-media--center slds-has-flexi-truncate">
                      { icon }

                      <div className="slds-media__body slds-truncate">
                          <h2><span className="slds-text-heading--small">{ this.props.title }</span></h2>
                      </div>
                  </header>
                  <div className="slds-no-flex">
                      <Button type="icon-bare" icon="close" onClick={ this.props.onRemove } />
                  </div>
              </div>

              <div className="slds-card__body" style={{ flex: '1' }}>
                  <div className="slds-table slds-p-around--medium" style={{ height: '100%' }}>
                    { content }
                  </div>
              </div>
          </article>
        );
    }
}

Card.propTypes = {
    iconCategory: React.PropTypes.string,
    iconName: React.PropTypes.string,
    loading: React.PropTypes.bool,
    title: React.PropTypes.string.isRequired,
    onRemove: React.PropTypes.func.isRequired
};

export default Card;