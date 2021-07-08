import { CLEAR_USER, SET_USER, UPDATE_TOKEN } from '../../types';

const initialState = { accessToken: '', data: {} };
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                data: { ...action.payload.user },
                accessToken: action.payload.accessToken
            };
        case UPDATE_TOKEN:
            return {
                ...state,
                accessToken: action.payload
            };
        case CLEAR_USER:
            return {
                ...state,
                data: {},
                accessToken: ''
            };
        default:
            return state;
    }
}
