import { SET_USER } from '../../types';
const initialState = { token: '', role: '' };
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return state;
        default:
            return state;
    }
}
