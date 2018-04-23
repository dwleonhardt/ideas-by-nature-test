import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Exchange from './components/Exchange';

ReactDOM.render(
  <Provider store={ store }>
    <Exchange />
  </Provider>,
document.getElementById('root'));
