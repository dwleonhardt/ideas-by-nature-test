import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PriceGraph } from '../actions/ExchangeActions';
import moment from 'moment';
import * as d3 from 'd3';
import style from '../style/graph.css';

class Graph extends Component {
  componentDidMount() {
    let currency = this.props.history.location.search.substring(1);
    let now = moment.utc(moment()).format();
    let previousDay = moment.utc(moment().subtract(24, 'h').toDate()).format();
    fetch(`https://ideas-by-nature-test.herokuapp.com/price_date?start=${previousDay}&end=${now}&currency=${currency}`)
    .then((response) => response.json())
    .then((prices) => {
      prices = prices.reverse();
      prices.map((p) => {
        p.price = new Number(p.price).toFixed(2);
        p.time = new Date(p.time);
      })
      this.props.PriceGraph(currency, prices);
      this.createGraph();
    })
  }

  createGraph () {
    const price = [];
    const time = [];
    const margin = {
            top: 20,
            right: 30,
            bottom: 50,
            left: 60
          },
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

    const barWidth = new Number(width / this.props.data.length);
    for (var i = 0; i < this.props.data.length; i++) {
      price.push(this.props.data[i].price);
      time.push(this.props.data[i].time);
    }

    d3.selectAll('svg > *').remove();

    const y = d3.scaleLinear()
    .domain([d3.min(price) -5, d3.max(price) + 5])
    .range([height, 0]);

    const x = d3.scaleTime()
    .domain([d3.min(time), d3.max(time)])
    .range([0, width]);


    const chart = d3.select('.container___3wpGl')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const div = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)
    .style('display', 'none');

    const bar = chart.selectAll('g')
    .data(price)
    .enter().append('g')
    .attr('class', 'bar')
    .attr('transform', function(d, i) { return 'translate(' + i * barWidth + ',0)'; })
    .on('mouseover', function(d) {
       div.transition()
         .duration(200)
         .style('opacity', .9);
       div.html(`Price: $${d} <br/> Time: ${moment(time[price.indexOf(d)]).format('h:mm A')}`)
         .style('margin-left', (d3.event.pageX + 5) + 'px')
         .style('top', (d3.event.pageY - 28) + 'px')
         .style('display', 'inline')
         .style('position', 'absolute')
         .style('background', '#c09bf7')
         .style('font', '0.7em sans-serif')
         .style('padding', '8px')
         .style('border-radius', '8px')
       })
     .on('mouseout', function(d) {
       div.transition()
         .duration(500)
         .style('opacity', 0)
         div.style('display', 'none');
       });



    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y)
    const yTicks = y.ticks(),
    yTickFormat = y.tickFormat(function(d) { return d; }),
    xTicks = x.ticks(),
    xTickFormat = x.tickFormat(d3.timeHour(time));

    yTicks.map(yTickFormat);
    xTicks.map(xTickFormat);


    chart.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    chart.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    bar.append('rect')
    .attr('y', function(d) {
      return y(d);
    })
    .attr('height', function(d) { return height - y(d); })
    .attr('width', barWidth - 1)

    chart.selectAll('.bar')
    .data(price)
    .enter().append('rect')
    .attr('x', function(d) { return x(d); })
    .attr('y', function(d) { return y(d); })
    .attr('height', function(d) { return height - y(d); })
    .attr('width', d3.scaleBand().range([height, 0]))

    chart.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x',0 - (height / 2))
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('Price (USD)');

    chart.append('text')
    .attr('transform',
          'translate(' + (width/2) + ' ,' +
                         (height + margin.top + 20) + ')')
    .style('text-anchor', 'middle')
    .style('font-size', '1em')
    .text('Date');



  }
  render() {
    return (
      <div className={style.flex}>
        <h1>{this.props.currency}</h1>
        <svg className={style.container}></svg>
      </div>
    )
  }

}



const mapStateToProps = (state) => {
  return {
    data: state.graph.data,
    currency: state.graph.currency
  };
}

export default connect(mapStateToProps, { PriceGraph })(Graph);
