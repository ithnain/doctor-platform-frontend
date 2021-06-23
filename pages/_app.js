import { Provider } from "react-redux";
import PropTypes from "prop-types";
import "../styles/globals.scss";
import store, { persistor } from "@redux/store";
import "normalize.css";
import "antd/dist/antd.css";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
MyApp.propTypes = { Component: PropTypes.func, pageProps: PropTypes.object };

export default MyApp;
