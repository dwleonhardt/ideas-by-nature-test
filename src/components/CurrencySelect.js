import React, { Component } from 'react';
import { connect } from 'react-redux';


class CurrencySelect extends Component {
  render() {
    if (this.props.currencyModal) {
      return (
          <div>
            <h1>TEST</h1>
          </div>
        )
    }

    else {
      return (
        <p>hey</p>
      )
    }

  }
}

const mapStateToProps = (state) => {
  return {
    currencyModal: state.currencyModal
  };
}

export default connect(mapStateToProps, {  })(CurrencySelect);
