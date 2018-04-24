import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ExchangeSend, ExchangeRecieve, CurrencyModal } from '../actions/ExchangeActions';
import CurrencySelect from './CurrencySelect'
import style from '../style/exchange.css';
import { icons } from '../assets/icons';

class Exchange extends Component {

  sendHandler(e) {
    console.log(icons);
    this.props.ExchangeSend(this.props.send, e.target.value);
  }
  recieveHandler(e) {
    this.props.ExchangeRecieve(this.props.recieve, e.target.value);
  }
  openModal(setting) {
    this.props.CurrencyModal(true, setting);
  }

  render() {
    return (
      <div>
        <form className={style.exchangeForm}>
          <div className={style.inputs}>
            <div className={style.col}>
              <img
                className={style.coinIcon} src={icons[this.props.send]}
                alt="BTC"
                onClick={() => this.openModal('Send')}
              >
              </img>
              <input
                className={style.input} placeholder="Send" onChange={ e => this.sendHandler(e)} />
            </div>
            <div className={style.col}>
              <img
                className={style.coinIcon} src={icons[this.props.recieve]}
                alt="BTC"
                onClick={() => this.openModal('Recieve')}
              >
              </img>
              <input className={style.input} placeholder="Recieve" onChange={ e => this.recieveHandler(e)}/>
            </div>
          </div>
          <button className={style.submit} type="button">Submit</button>
        </form>
        <CurrencySelect />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    send: state.send.currency,
    recieve: state.recieve.currency,
    modal: state.modal
  };
}

export default connect(mapStateToProps, { ExchangeSend, ExchangeRecieve, CurrencyModal })(Exchange);
