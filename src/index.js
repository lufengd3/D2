import {createElement, render} from 'rax';
import App from './App';
import store from './store';

render(<App store={store} />);
