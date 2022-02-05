import '../styles/globals.scss';
import 'normalize.css';
import 'antd/dist/antd.css';
import 'toastr/toastr.scss';
import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const [direction, setdirection] = useState(null);
    useEffect(() => {
        router.locale === 'ar' ? setdirection('rtl') : setdirection('ltr');
    }, [router.locale]);
    const qClient = useRef(new QueryClient());
    return (
        <QueryClientProvider client={qClient.current}>
            <Hydrate state={pageProps.dehydratedState}>
                <Head>
                    <title>Doctor Platform </title>
                </Head>
                <Component {...pageProps} direction={direction} />
            </Hydrate>
        </QueryClientProvider>
    );
}
MyApp.propTypes = { Component: PropTypes.func, pageProps: PropTypes.object };

export default MyApp;
