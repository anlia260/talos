/**
 *
 */

import {createStore, applyMiddleware, compose} from 'redux';
import {persistState} from 'redux-devtools';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import DevTools from '../../container/DevTools';
const logger = createLogger();
const enhancer = compose(
    applyMiddleware(thunk),
    DevTools.instrument(),
    persistState(
        window.location.href.match(
            /[?&]debug_session=([^&#]+)\b/
        )
    )
);

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, enhancer);
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers/index');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
