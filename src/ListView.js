import React, { Component } from 'react';
import Util from './Util';

function SuccessIcon(props) {
  if(props.domainName.endsWith('.lol') || props.domainName.endsWith('.cars')) {
    return <i className="glyphicon glyphicon-ok text-success"></i>;
  } else {
    return <span/>;
  }
}

class ListView extends Component {
  handleClick(e, id) {
    e.preventDefault();
    this.props.selectDomain(id);
  }

  render() {
    const domains = this.props.domains.map((domain) => {
      return <tr key={domain.id}>
        <td><a href="#" onClick={(e) => { this.handleClick(e, domain.id) }}>{domain.domain}</a></td>
        <td className="text-center"><SuccessIcon domainName={domain.domain}/></td>
        <td className="money">${Util.formatMoney(domain.price)}</td>
      </tr>
    });

    return <div className="domain-container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Domain name</th>
            <th className="text-center">Unregistry</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {domains}
        </tbody>
      </table>
    </div>
  }
}

export default ListView;
