import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PriceGraph } from '../actions/ExchangeActions';
import moment from 'moment';
import * as d3 from 'd3';
import style from '../style/graph.css';


// Since this is "time series" visualization, our x axis should have a time scale.
 // Our x domain will be the extent ([min, max]) of x values (Dates) in our data set.
 // Our x range will be from x=0 to x=width.


 // Our y axis should just have a linear scale.
 // Our y domain will be the extent of y values (numbers) in our data set.

 //
 // // These two functions select the scaled x and y values (respectively) of our data.

 //


class Graph extends Component {
  getPriceByDate () {
    let date = new Date();
    let today = date.getDay();
    let sunday = date.getDate() - today + (today === 0 ? -6:-1);
    let weekStart = moment.utc(date.setDate(sunday)).format();
    let saturday = new Date().getDate() - today + (today === 0 ? -6:11);
    let weekEnd = moment.utc(date.setDate(saturday)).format();
    fetch(`http://localhost:4000/price_date?start=${weekStart}&end=${weekEnd}&currency=BTC`)
    .then((response) => response.json())
    .then((prices) => {
      prices.map((p) => {
        p.price = new Number(p.price).toFixed(2);
      })
      this.props.PriceGraph(prices);
      this.createGraph();
    })
  }

  createGraph () {
    console.log(d3);
    const data = [];
    const margin = {
            top: 20,
            right: 30,
            bottom: 30,
            left: 40
          },
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

    const barWidth = new Number(width / this.props.data.length);
    for (var i = 0; i < this.props.data.length; i++) {
      data.push(new Number(this.props.data[i].price));
    }
    const y = d3.scalePow()
    .exponent(35)
    .domain([0, d3.max(data)])
    .range([height, 0]);

    const x = d3.scaleBand()
    .range([0, width])
    .round(.1);

    const chart = d3.select(".container___3wpGl")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    const bar = chart.selectAll("g")
    .data(data)
    .enter().append("g")
    .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });


    const xAxis = d3.axisBottom(x)

    chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    bar.append("rect")
    .attr("y", function(d) {
      return y(d);
    })
    .attr("height", function(d) { return height - y(d); })
    .attr("width", barWidth - 1);

    bar.append("text")
    .attr("x", barWidth / 2)
    .attr("y", function(d) { return y(d) + 3; })
    .attr("dy", ".75em")
    .text(function(d) { return d; });

  }
  render() {
    return (
      <div>
        <h1 onClick={() => this.getPriceByDate()}>BTC</h1>
        <svg className={style.container}></svg>
      </div>
    )
  }

}



const mapStateToProps = (state) => {
  return {
    data: state.graph.data
  };
}

export default connect(mapStateToProps, { PriceGraph })(Graph);
