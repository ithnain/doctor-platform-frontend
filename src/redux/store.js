import { applyMiddleware, createStore } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';
import rootReducer from './reducers';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { useMemo } from 'react';

const persistConfig = {
    key: 'doctorPlatform',
    storage,
    whitelist: ['user']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
let store;

function makeStore(initialState) {
    return createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware()));
}

export const initializeStore = (preloadedState) => {
    let _store = store ?? makeStore(preloadedState);

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = makeStore({
            ...store.getState(),
            ...preloadedState
        });
        // Reset the current store
        store = undefined;
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store;
    // Create the store once in the client
    if (!store) store = _store;

    return _store;
};

export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState]);
    return store;
}
