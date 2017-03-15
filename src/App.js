import "babel-polyfill";
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import _ from 'underscore';
import { AlertList } from 'react-bs-notifier';

import './App.css';``
import Client from './Client';
import ListView from './ListView';
import DetailView from './DetailView';

const NAV_DETAIL_VIEW = Symbol();
const NAV_LIST_VIEW = Symbol();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alerts: [],
      domains: [],
      currentView: NAV_LIST_VIEW
    };

    Client.getDomains().then((data) => {
      this.setState({
          domains: data.domains
      });
    });
  }

  selectDomain = (domainId) => {
    Client.getDomainById(domainId).then((data) => {
      this.setState({
        currentView: NAV_DETAIL_VIEW,
        domain: data
      });
    });
  }

  saveChanges = (domain) => {
    var stateDomain = _.find(this.state.domains, function(sample) {
      return sample.id === domain.id
    });

    stateDomain.domain = domain.domain;
    stateDomain.price = domain.price * 100;

    this.setState({
      currentView: NAV_LIST_VIEW
    });
  }

  success = (headline, message) => {
    const newAlerts = this.state.alerts.concat({
      id: (new Date()).getTime(),
      type: 'success',
      headline,
      message
    });

    this.setState({
      alerts: newAlerts
    });
  }

  getView = () => {
    switch(this.state.currentView) {
      case NAV_LIST_VIEW:
        return <ListView domains={this.state.domains} selectDomain={this.selectDomain} />
      case NAV_DETAIL_VIEW:
        return <DetailView domain={this.state.domain} saveChanges={this.saveChanges} success={this.success}/>
      default:
        return <span/>
    }
  }

	onAlertDismissed = (alert) => {
		const alerts = this.state.alerts;
		const index = alerts.indexOf(alert);

		if (index >= 0) {
			this.setState({
				alerts: [...alerts.splice(0, index), ...alerts.slice(index + 1)]
			});
		}
	}

  render() {
    return (<div>
			<AlertList
				alerts={this.state.alerts}
				timeout={1000}
				onDismiss={this.onAlertDismissed}
			/>
      {this.getView()}
    </div>)
  }
}

export default App;
