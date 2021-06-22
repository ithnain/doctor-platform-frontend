import { CLEAR_USER, SET_USER } from '../../types';
const initialState = { accessToken: '', role: '', refreshToken: '', name: '', id: '' };
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                data: action.payload,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                role: action.payload.role,
                id: action.payload.id,
                name: action.payload.name,
            };
        case CLEAR_USER:
            return { ...state, data: {}, accessToken: '', role: '', refreshToken: '', name: '', id: ''};
        default:
            return state;
    }
}
