import '../styles/globals.scss';
import 'normalize.css';
import 'antd/dist/antd.css';
import 'toastr/toastr.scss';

import { useEffect, useState } from 'react';

import Head from 'next/head';
import Loader from '@src/components/loader';
import { PersistGate } from 'redux-persist/integration/react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { useRouter } from 'next/router';
import { useStore } from '@redux/store';

function MyApp({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState);
    const persistor = persistStore(store, {}, function () {
        persistor.persist();
    });
    const router = useRouter();
    const [direction, setdirection] = useState(null);
    useEffect(() => {
        router.locale === 'ar' ? setdirection('rtl') : setdirection('ltr');
    }, [router.locale]);
    return (
        <Provider store={store}>
            <PersistGate loading={Loader({ loading: true })} persistor={persistor}>
                <Head>
                    <title>Doctor Platform </title>
                </Head>
                <Component {...pageProps} direction={direction} />
            </PersistGate>
        </Provider>
    );
}
MyApp.propTypes = { Component: PropTypes.object, pageProps: PropTypes.object };

export default MyApp;
