import API from "@utils/axios";
import { SET_ENUMS } from "../../types";

export const GetEnumerationOnStart = async (store) => {
  try {
    let enums = await API.get("enumerations");
    console.log("enumse", enums);
    store.dispatch({ type: SET_ENUMS, payload: enums.data });
  } catch (error) {
    console.debug("enumse error", error, error.response);
  }
};
