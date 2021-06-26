import { CLEAR_USER, SET_USER } from '../../types';
const initialState = { accessToken: '', role: '', refreshToken: '', name: '', id: '' };
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                data: { ...action.payload.user },
                token: action.payload.accessToken
                // role: action.payload.role
            };
        case CLEAR_USER:
            return { ...state, data: {}, accessToken: '', role: '', refreshToken: '', name: '', id: ''};
        default:
            return state;
    }
}
