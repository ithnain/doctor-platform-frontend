import { CLEAR_USER, SET_USER } from '../../types';
export function setUser(payload) {
    console.log(payload);
    return { type: SET_USER, payload };
}
export function clearUser() {
    return { type: CLEAR_USER };
}
