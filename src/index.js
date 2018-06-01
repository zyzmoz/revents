import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'semantic-ui-css/semantic.min.css';
import './assets/css/master.css';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/util/ScrollToTop';
import thunk from 'redux-thunk';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import firebase from './config/config';

//redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const rrfConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true
}

const createStoreWithMiddleware = composeWithDevTools(
  applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }) /*Here goes the middlewares*/),
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase))(createStore);
import reducers from './reducers';

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <ScrollToTop>
        <ToastContainer />
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
