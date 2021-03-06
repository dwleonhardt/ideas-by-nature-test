import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ExchangeSend, ExchangeRecieve, CurrencyModal } from '../actions/ExchangeActions';
import CurrencySelect from './CurrencySelect';
import Nav from './Nav';
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

    fetch(`https://ideas-by-nature-test.herokuapp.com/exchange?send=${exchange.send.currency}&recieve=${exchange.recieve.currency}`)
    .then((response) => response.json())
    .then((prices) => {
      let sendPrice = new Number(prices.sendPrice).toFixed(2);
      let recievePrice = new Number(prices.recievePrice).toFixed(2);
      let exchangeQty = ((sendPrice / recievePrice) * this.props.send.qty).toFixed(8);
      console.log(sendPrice / recievePrice)
      this.props.ExchangeRecieve(this.props.recieve.currency, exchangeQty);
    })
  }

  render() {
    return (
      <div>
        <Nav />
        <form className={style.exchangeForm}  onSubmit={(e) => e.preventDefault()}>
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
          <button className={style.submit} type="submit" onClick={() => this.calculateExchange()}>Submit</button>
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
