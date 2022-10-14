import './polifill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';

import {createBrowserHistory} from 'history';
const history = createBrowserHistory();



const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <>
   <React.StrictMode>
    <Provider store={createStoreWithMiddleware(rootReducer)}>
        <App />
    </Provider>
  </React.StrictMode> 
  </>,
  document.getElementById("root")
);


// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

