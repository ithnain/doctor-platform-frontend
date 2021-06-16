import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/globals.scss';
import store from '@redux/store';
import 'normalize.css';
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}
MyApp.propTypes = { Component: PropTypes.func, pageProps: PropTypes.object };

export default MyApp;
