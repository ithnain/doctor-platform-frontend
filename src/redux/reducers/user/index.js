import { CLEAR_USER, SET_USER } from '../../types';
const initialState = { token: '', role: '' };
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                data: action.payload,
                token: action.payload.id,
                role: action.payload.role
            };
        case CLEAR_USER:
            return { ...state, data: {}, token: '', role: '' };
        default:
            return state;
    }
}
