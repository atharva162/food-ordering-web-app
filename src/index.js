import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.scss';
import store from './store/store';

ReactDOM.render(
  <Provider store={store}>
       <AppRouter />,
  </Provider>,
  document.getElementById('root')
);
