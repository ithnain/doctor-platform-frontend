import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/globals.scss';
import store from '@redux/store';
import 'normalize.css';
import 'antd/dist/antd.css';
import { useLocalStorage } from '@src/hooks/useLocalStorage';

function MyApp({ Component, pageProps }) {
    const [storageLang, setLang] = useLocalStorage('storageLang', 'en');
    if (!storageLang) {
        setLang('en');
    }
    return (
        <Provider store={store}>
            <Component {...pageProps} lang={storageLang} setLang={setLang} />
        </Provider>
    );
}
MyApp.propTypes = { Component: PropTypes.Node, pageProps: PropTypes.object };

export default MyApp;
