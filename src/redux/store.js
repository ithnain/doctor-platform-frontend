import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import Thunk from "redux-thunk";

import reducers from "./reducers";

const IsDev = true;
const middles = [Thunk];
if (IsDev) {
  middles.push(logger);
}

export default compose(applyMiddleware(...middles))(createStore)(reducers);

