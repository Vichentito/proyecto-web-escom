import { types } from '../types/types';

const initialState = {
    isLogin: false,
}

export const authReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                isLogin: true
            }

        case types.authLogout:
            return {
                isLogin: false
            }


        default:
            return state;
    }

}


