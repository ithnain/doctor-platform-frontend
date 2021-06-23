import { SET_USER, SET_IS_RTL } from "../../types";
export function getRole(payload) {
  return { type: SET_USER, payload };
}

export function setIsRtl(payload) {
  return { type: SET_IS_RTL, payload };
}
