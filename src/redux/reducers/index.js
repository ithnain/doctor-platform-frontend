import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import user from "./user";
import rlt from "./rtl";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["rlt", "user"],
};

const rootReducer = persistCombineReducers(persistConfig, {
  user,
  rlt,
});

export default rootReducer;
