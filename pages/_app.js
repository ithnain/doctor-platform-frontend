import '../styles/globals.scss';
import 'normalize.css';
import 'antd/dist/antd.css';
import 'toastr/toastr.scss';

import { PersistGate } from 'redux-persist/integration/react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { useStore } from '@redux/store';

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
