import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ExchangeSend, ExchangeRecieve, CurrencyModal } from '../actions/ExchangeActions';
import style from '../style/exchange.css';
import CurrencySelect from './CurrencySelect'

class Exchange extends Component {

  sendHandler(e) {
    this.props.ExchangeSend(e.target.value);
  }
  recieveHandler(e) {
    this.props.ExchangeRecieve(e.target.value);
  }
  modalHandler() {
    
  }

  render() {
    return (
      <div>
        <form className={style.exchangeForm}>
          <div className={style.inputs}>
            <div className={style.col}>
              <img
                className={style.coinIcon} src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg"
                alt="BTC"
                onClick={() => this.modalHandler()}
              >
              </img>
              <input
                className={style.input} placeholder="Send" onChange={ e => this.sendHandler(e)} />
            </div>
            <div className={style.col}>
              <img
                className={style.coinIcon} src="https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg"
                alt="BTC"
                onClick={() => this.modalHandler()}
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
    send: state.send,
    recieve: state.recieve,
    currencyModal: state.currencyModal
  };
}

export default connect(mapStateToProps, { ExchangeSend, ExchangeRecieve, CurrencyModal })(Exchange);
