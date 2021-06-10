import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/globals.scss';
import store from '@redux/store';

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}
MyApp.propTypes = { Component: PropTypes.element, pageProps: PropTypes.object };

export default MyApp;
