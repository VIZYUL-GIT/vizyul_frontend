import {
  applyMiddleware,
  createStore,
  combineReducers
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import reducers from '../reducers';
import rootSaga from '../sagas';

const history = createBrowserHistory({});

const sagaMiddleware = createSagaMiddleware();
const reduxRouterMiddleware = routerMiddleware(history);
const enhancers = composeWithDevTools(
  applyMiddleware(sagaMiddleware),
  applyMiddleware(reduxRouterMiddleware)
);
const store = createStore(
  reducers,
  enhancers
);

sagaMiddleware.run(rootSaga);

export default store;
export {
  history
};
