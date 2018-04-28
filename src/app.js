import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Exchange from './components/Exchange';
import MarketTrends from './components/MarketTrends';
import Graph from './components/Graph';
import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(
    <Provider store={ store }>
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Exchange}/>
          <Route exact path="/trends" component={MarketTrends}/>
          <Route exact path="/graph" component={Graph}/>
        </div>
      </BrowserRouter>
    </Provider>,

    document.getElementById('root'));
