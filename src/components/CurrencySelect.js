import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CurrencyModal, ExchangeSend, ExchangeRecieve } from '../actions/ExchangeActions';
import style from '../style/modal.css';


class CurrencySelect extends Component {

  closeModal() {
    this.props.CurrencyModal(false);
  }

  selectCurrency(currency) {
    if (this.props.setting === 'Send') {
      this.props.ExchangeSend(currency, this.props.send);
      this.closeModal();
    }
    else if (this.props.setting === 'Recieve') {
      this.props.ExchangeRecieve(currency, this.props.recieve);
      this.closeModal();
    }
    else {
      return new Error('Invalid setting at currency selection');
    }
  }

  render() {
    if (this.props.toggle) {
      return (
          <div className={style.modal}>
            <div className={style.rightAlign}>
              <img
                className={style.closeIcon}
                onClick={() => this.closeModal()}
                src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Black_close_x.svg"
              >
              </img>
            </div>
            <p className={style.header}>{this.props.setting} Currency</p>
            <div className={style.container}>
              <img
                className={style.selectIcon}
                onClick={() => this.selectCurrency('BTC')}
                src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg"
              >
              </img>
              <img
                className={style.selectIcon}
                onClick={() => this.selectCurrency('ETH')}
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg"
              >
              </img>
              <img
                className={style.selectIcon}
                onClick={() => this.selectCurrency('LTC')}
                src="https://upload.wikimedia.org/wikipedia/commons/1/1c/Litecoin.svg"
              >
              </img>
              <img
                className={style.selectIcon}
                onClick={() => this.selectCurrency('DASH')}
                src="https://www.iconspng.com/clipart/dash-concise/dash-concise.svg"
              >
              </img>
            </div>
          </div>
        )
    }
    else {
      return (
        <div></div>
      )
    }

  }
}

const mapStateToProps = (state) => {
  return {
    toggle: state.modal.toggle,
    setting: state.modal.setting,
    send: state.send.qty,
    recieve: state.recieve.qty
  };
}

export default connect(mapStateToProps, { CurrencyModal, ExchangeSend, ExchangeRecieve })(CurrencySelect);
