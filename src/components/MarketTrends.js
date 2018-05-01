import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TrendsData } from '../actions/ExchangeActions';
import Graph from './Graph';
import Nav from './Nav';
import moment from 'moment';
import style from '../style/trends.css';
import { icons } from '../assets/icons';

class Markettdends extends Component {
  componentDidMount() {
    this.props.TrendsData({}, true);
    fetch('https://ideas-by-nature-test.herokuapp.com/price_data')
    .then((response) => response.json())
    .then((prices) => {
      const data = {};
      prices.map(e => {
        data[e.name] = e;
      })
      this.props.TrendsData(data, false);
    })
  }

  render() {
    if (this.props.loading) {
      return (
        <div>
          <Nav />
          <div className={style.navPad}>
            <div>Loading...</div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div>
          <Nav />
          <div className={style.navPad}>
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Volume</th>
                  <th>Change (24h)</th>
                </tr>
                <tr>
                  <td>
                    <a href='/graph?BTC'>
                      <img className={style.icon} src={icons.BTC}></img>
                      Bitcoin
                    </a>
                  </td>
                  <td>Price: ${this.props.data.BTC.price}</td>
                  <td>Volume: ${this.props.data.BTC.volume}</td>
                  <td>Change (24h): {this.props.data.BTC.cap24hrChange}%</td>
                </tr>
                <tr>
                  <td>
                    <a href='/graph?ETH'>
                      <img className={style.icon} src={icons.ETH}></img>
                      Ethereum
                    </a>
                  </td>
                  <td>Price: ${this.props.data.ETH.price}</td>
                  <td>Volume: ${this.props.data.ETH.volume}</td>
                  <td>Change (24h): {this.props.data.ETH.cap24hrChange}%</td>
                </tr>
                <tr>
                  <td>
                    <a href='/graph?LTC'>
                      <img className={style.icon} src={icons.LTC}></img>
                      Litecoin
                    </a>
                  </td>
                  <td>Price: ${this.props.data.LTC.price}</td>
                  <td>Volume: ${this.props.data.LTC.volume}</td>
                  <td>Change (24h): {this.props.data.LTC.cap24hrChange}%</td>
                </tr>
                <tr>
                  <td>
                    <a href='/graph?DASH'>
                      <img className={style.icon} src={icons.DASH}></img>
                      Dash
                    </a>
                  </td>
                  <td>Price: ${this.props.data.DASH.price}</td>
                  <td>Volume: ${this.props.data.DASH.volume}</td>
                  <td>Change (24h): {this.props.data.DASH.cap24hrChange}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    }
  }

}



const mapStateToProps = (state) => {
  return {
    data: state.trends.data,
    loading: state.trends.loading
  };
}

export default connect(mapStateToProps, { TrendsData })(Markettdends);
