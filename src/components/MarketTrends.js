import React, { Component } from 'react';
import { connect } from 'react-redux';
import Graph from './Graph';
import moment from 'moment';


class MarketTrends extends Component {

  render() {
    return (
      <div>
        <Graph />
      </div>
    )
  }

}



const mapStateToProps = (state) => {
  return {

  };
}

export default connect(mapStateToProps, {  })(MarketTrends);
