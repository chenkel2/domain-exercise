import React, { Component } from 'react';
import Util from './Util';

class DetailView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.domain.id,
      price: Util.formatMoney(props.domain.price),
      registrant_email: props.domain.registrant_email,
      domain: props.domain.domain
    }
  }

  handleDomainChange = (event) => {
    this.setState({
      domain: event.target.value
    });
  }

  handleRegistrantChange = (event) => {
    this.setState({
      registrant_email: event.target.value
    });
  }

  handlePriceChange = (event) => {
    this.setState({
      price: event.target.value
    });
  }

  saveChanges = (event) => {
    this.props.saveChanges({
      id: this.state.id,
      price: this.state.price,
      registrant_email: this.state.registrant_email,
      domain: this.state.domain
    })
  }

  render() {
    return <div className="detail-view-container">
      <form className="form-horizontal">
        <div className="form-group">
          <label className="col-sm-4 control-label">Domain name</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" value={this.state.domain} onChange={this.handleDomainChange} placeholder="Domain name"/>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-4 control-label">Registrant Email</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" value={this.state.registrant_email} onChange={this.handleRegistrantChange} placeholder="Registrant Email"/>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-4 control-label">Price</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" placeholder="Price" value={this.state.price} onChange={this.handlePriceChange}/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-4 col-sm-8">
            <button type="button" className="btn btn-success" onClick={this.saveChanges}>Save Changes</button>
          </div>
        </div>
      </form>
    </div>
  }
}

export default DetailView;
