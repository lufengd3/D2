import {createElement, render} from 'rax';
import {Provider} from 'mobx-rax';
import App from './App';
import store from './store';

render(
  <Provider {...store}>
    <App />
  </Provider>
);
