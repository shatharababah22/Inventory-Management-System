// store.js
import { createStore } from 'redux';
import dataReducer from './reducer';

const store = createStore(dataReducer);

export default store;
