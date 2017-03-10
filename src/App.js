import React, { Component } from 'react';
import Client from './Client';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ListView from './ListView';
import DetailView from './DetailView';
import _ from 'underscore';

const NAV_DETAIL_VIEW = Symbol();
const NAV_LIST_VIEW = Symbol();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      return sample.id == domain.id
    });

    stateDomain.domain = domain.domain;
    stateDomain.price = domain.price * 100;

    this.setState({
      currentView: NAV_LIST_VIEW
    });
  }

  render() {
    switch(this.state.currentView) {
      case NAV_LIST_VIEW:
        return <ListView domains={this.state.domains} selectDomain={this.selectDomain}/>
      case NAV_DETAIL_VIEW:
        return <DetailView domain={this.state.domain} saveChanges={this.saveChanges}/>
      default:
        return <span/>
    }
  }
}

export default App;