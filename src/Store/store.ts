import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { IAppState } from 'Store/types';
import reducers from './reducers';

export default function configureStore(initState: IAppState) {
  let composeEnhancers;
  if (typeof window !== 'undefined') {
    composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  } else {
    composeEnhancers = compose;
  }
  return createStore(reducers, initState, composeEnhancers(
    applyMiddleware(thunk),
  ));
}
