import "../styles/globals.scss";
import "normalize.css";
import "antd/dist/antd.css";
import "toastr/toastr.scss";

import { useEffect, useState } from "react";

import Head from "next/head";
import Loader from "../src/components/loader";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import { GetEnumerationOnStart } from "../src/redux/actions/enumeration";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";

import store from "@redux/store";

const persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [direction, setdirection] = useState(null);
  useEffect(() => {
    router.locale === "ar" ? setdirection("rtl") : setdirection("ltr");
  }, [router.locale]);
  return (
    <Provider store={store}>
      <PersistGate
        loading={Loader({ loading: true })}
        persistor={persistor}
        onBeforeLift={() => {
          GetEnumerationOnStart(store);
        }}
      >
        <Head>
          <title>Doctor Platform </title>
        </Head>
        <Component {...pageProps} direction={direction} />
      </PersistGate>
    </Provider>
  );
}
MyApp.propTypes = { Component: PropTypes.func, pageProps: PropTypes.object };

export default MyApp;
