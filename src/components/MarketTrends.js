import React, { Component } from 'react';
import { connect } from 'react-redux';
import Graph from './Graph';


class MarketTrends extends Component {

  render() {
    return (
    <Graph />
    )
  }

}



const mapStateToProps = (state) => {
  return {

  };
}

export default connect(mapStateToProps, {  })(MarketTrends);
