import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'semantic-ui-css/semantic.min.css';
import './assets/css/master.css';
import { BrowserRouter } from 'react-router-dom';

//redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

const createStoreWithMiddleware = applyMiddleware()(createStore);

import reducers from './reducers';

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>  ,
  document.getElementById('root')
);
