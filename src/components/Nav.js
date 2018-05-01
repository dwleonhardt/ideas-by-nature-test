import React, { Component } from 'react';
import style from '../style/nav.css';

class Nav extends Component {

  render() {
    return (
      <div className={style.container}>
        <div className={style.linkAlign}>
          <div className={style.navLink}>
            <a href="/">
              <div className={style.linkText}>
                Crypto Exchange
              </div>
            </a>
          </div>
          <div className={style.navLink}>
            <a href="/trends">
              <div className={style.linkText}>
                Market Trends
              </div>
            </a>
          </div>
          <div className={style.navLink}>
            <a href="/">
              <div className={style.linkText}>
                My Wallets
              </div>
            </a>
          </div>
        </div>
      </div>
    )
  }
}


export default Nav;
