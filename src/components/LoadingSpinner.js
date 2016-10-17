import React, { Component } from 'react';
import { Spinner } from "react-lightning-design-system";

export default class LoadingSpinner extends Component {
    render() {
        return (
          <div className="slds-is-relative slds-p-vertical--large">
              <Spinner container={ false }/>
          </div>
        );
    }
}