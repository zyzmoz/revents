import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'semantic-ui-css/semantic.min.css';
import './assets/css/master.css';
import { BrowserRouter } from 'react-router-dom';
import  ScrollToTop from './components/util/ScrollToTop';
import thunk from 'redux-thunk';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



//redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(thunk/*Here goes the middlewares*/))(createStore);
import reducers from './reducers';

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <ScrollToTop>
        <ToastContainer />
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>  ,
  document.getElementById('root')
);
