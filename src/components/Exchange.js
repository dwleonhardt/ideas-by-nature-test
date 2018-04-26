import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ExchangeSend, ExchangeRecieve, CurrencyModal } from '../actions/ExchangeActions';
import CurrencySelect from './CurrencySelect'
import style from '../style/exchange.css';
import { icons } from '../assets/icons';

class Exchange extends Component {

  sendHandler(e) {
    this.props.ExchangeSend(this.props.send.currency, e.target.value);
  }
  recieveHandler(qty) {
    this.props.ExchangeRecieve(this.props.recieve.currency, qty);
  }
  openModal(setting) {
    this.props.CurrencyModal(true, setting);
  }
  calculateExchange() {
    let exchange = {
      send: this.props.send,
      recieve: this.props.recieve
    }

    fetch('http://localhost:3000/exchange', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exchange)
    })
    .then((response) => response.json())
    .then((prices) => {
      let sendPrice = new Number(prices.sendPrice).toFixed(2);
      let recievePrice = new Number(prices.recievePrice).toFixed(2);
      let exchangeQty = ((sendPrice / recievePrice) * this.props.send.qty).toFixed(8);
      console.log(sendPrice / recievePrice)
      // console.log(exchangeQty);
      this.props.ExchangeRecieve(this.props.recieve.currency, exchangeQty);
    })
  }

  render() {
    return (
      <div>
        <form className={style.exchangeForm}>
          <div className={style.inputs}>
            <div className={style.col}>
              <img
                className={style.coinIcon} src={icons[this.props.send.currency]}
                alt="BTC"
                onClick={() => this.openModal('Send')}
              >
              </img>
              <input
                className={style.input} placeholder="Send" onChange={ e => this.sendHandler(e)} />
            </div>
            <div className={style.col}>
              <img
                className={style.coinIcon} src={icons[this.props.recieve.currency]}
                alt="BTC"
                onClick={() => this.openModal('Recieve')}
              >
              </img>
              <input className={style.input} placeholder="Recieve" value={this.props.recieve.qty} onChange={ e => this.recieveHandler(e)} disabled/>
            </div>
          </div>
          <button className={style.submit} type="button" onClick={() => this.calculateExchange()}>Submit</button>
        </form>
        <CurrencySelect />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    send: state.send,
    recieve: state.recieve,
    modal: state.modal
  };
}

export default connect(mapStateToProps, { ExchangeSend, ExchangeRecieve, CurrencyModal })(Exchange);
