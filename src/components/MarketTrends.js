import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PriceGraph } from '../actions/ExchangeActions';
import Graph from './Graph';
import moment from 'moment';


class MarketTrends extends Component {

  render() {
    return (
      <div>
        <a href='/graph?BTC'>
          <h1>BTC</h1>
        </a>
        <a href='/graph?ETH'>
          <h1>ETH</h1>
        </a>
        <a href='/graph?LTC'>
          <h1>LTC</h1>
        </a>
        <a href='/graph?DASH'>
          <h1>DASH</h1>
        </a>
      </div>
    )
  }

}



const mapStateToProps = (state) => {
  return {

  };
}

export default connect(mapStateToProps, { PriceGraph })(MarketTrends);
