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
    fetch(`https://ideas-by-nature-test.herokuapp.com/price_date?start=${weekStart}&end=${weekEnd}&currency=BTC`)
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
    const price = [];
    const time = [];
    const margin = {
            top: 20,
            right: 30,
            bottom: 30,
            left: 60
          },
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

    const barWidth = new Number(width / this.props.data.length);
    for (var i = 0; i < this.props.data.length; i++) {
      price.push(new Number(this.props.data[i].price));
      time.push(new Date(this.props.data[i].time));
    }
    console.log(d3);
    const y = d3.scaleLinear()
    .domain([d3.min(price) -5, d3.max(price) +5])
    .range([height, 0]);

    const x = d3.scaleLinear()
    .domain([d3.min(time), d3.max(time)])
    .range([0, width]);

    const chart = d3.select(".container___3wpGl")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    const bar = chart.selectAll("g")
    .data(price)
    .enter().append("g")
    .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y)
    const yTicks = y.ticks(),
    yTickFormat = y.tickFormat(function(d) { return "$" + d; }),
    xTicks = x.ticks(),
    xTickFormat = x.tickFormat(function(d) { return d; })

    yTicks.map(yTickFormat);
    xTicks.map(xTickFormat);

    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");

    bar.append("rect")
    .attr("y", function(d) {
      return y(d);
    })
    .attr("height", function(d) { return height - y(d); })
    .attr("width", barWidth - 1);

    // bar.append("text")
    //   .attr("x", d3.scaleBand().range([height, 0]))
    //   .attr("y", function(d) { return y(d) + 3; })
    //   .attr("dy", ".75em")
    //   .text(function(d) { return d; });

    chart.selectAll(".bar")
    .data(price)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d); })
    .attr("y", function(d) { return y(d); })
    .attr("height", function(d) { return height - y(d); })
    .attr("width", d3.scaleBand().range([height, 0]));


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
