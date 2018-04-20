import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SomethingAmazing } from '../actions/SomethingAmazing';

class Home extends Component {

  amazingHandler(e) {
    this.props.SomethingAmazing(e.target.value);
  }

  render() {
    return (
      <div>
        <h1>{this.props.input}</h1>
        <input placeholder="somethingamazing" onChange={ e => this.amazingHandler(e)} />
      </div>
    )

  }
}

const mapStateToProps = (SomethingAmazing) => {
  const { input } = SomethingAmazing;
  return { input };
}

export default connect(mapStateToProps, { SomethingAmazing })(Home);
