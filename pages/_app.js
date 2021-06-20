import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/globals.scss';
import { useStore } from '@redux/store';
import 'normalize.css';
import 'antd/dist/antd.css';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

function MyApp({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState);
    const persistor = persistStore(store, {}, function () {
        persistor.persist();
    });
    return (
        <Provider store={store}>
            <PersistGate loading={<div>loading</div>} persistor={persistor}>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    );
}
MyApp.propTypes = { Component: PropTypes.func, pageProps: PropTypes.object };

export default MyApp;
