import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ExchangeSend, ExchangeRecieve } from '../actions/ExchangeActions';
import style from '../style/exchange.css';

class Home extends Component {

  sendHandler(e) {
    this.props.ExchangeSend(e.target.value);
  }
  recieveHandler(e) {
    this.props.ExchangeRecieve(e.target.value);
  }

  render() {
    return (
      <div>
        <form className={style.exchangeForm}>
          <div className={style.inputs}>
            <input className={style.input} placeholder="Send" onChange={ e => this.sendHandler(e)} />
            <input className={style.input} placeholder="Recieve" onChange={ e => this.recieveHandler(e)}/>
          </div>
          <button className={style.submit} type="button">Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    send: state.send,
    recieve: state.recieve
  };
}

export default connect(mapStateToProps, { ExchangeSend, ExchangeRecieve })(Home);
