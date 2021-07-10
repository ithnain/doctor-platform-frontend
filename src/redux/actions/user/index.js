import { CLEAR_USER, SET_USER, UPDATE_TOKEN } from '../../types';
export function setUser(payload) {
    return { type: SET_USER, payload };
}
export function updateToken(payload) {
    return { type: UPDATE_TOKEN, payload };
}
export function clearUser() {
    return { type: CLEAR_USER };
}
