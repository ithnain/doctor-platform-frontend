import { combineReducers } from "redux";
import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import user from "./user";
import patient from "./patient";
import enums from "./enumeration";

const config = {
  key: "root",
  storage: storage,
  whitelist: ["user", "enums"],
};

const rootReducer = persistCombineReducers(config, {
  user,
  patient,
  enums,
});
export default rootReducer;
