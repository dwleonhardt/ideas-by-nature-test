import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SendExchange } from '../actions/Exchange';
import style from '../style/exchange.css';

class Home extends Component {

  sendHandler(e) {
    this.props.SendExchange(e.target.value);
  }

  render() {
    return (
      <div>
        <form className={style.exchangeForm}>
          <div className={style.inputs}>
            <input className={style.input} placeholder="Send" onChange={ e => this.sendHandler(e)} />
            <input className={style.input} placeholder="Recieve" />
          </div>
          <button className={style.submit} type="button">Submit</button>
        </form>
      </div>
    )

  }
}

const mapStateToProps = (SendExchange) => {
  const { send } = SendExchange;
  return { send };
}

export default connect(mapStateToProps, { SendExchange })(Home);
