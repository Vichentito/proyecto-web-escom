import { fetchLogin } from '../helpers/fetch';
import { types } from '../types/types';
import Swal from 'sweetalert2';



export const startLogin = ( username, password ) => {
    return async( dispatch ) => {

        const resp = await fetchLogin( 'Login', { username, password }, 'GET' );
        console.log();
        if( resp.split('\n')[0]==='login\r' ) {
            dispatch( login({
                isLoged: true,
                name: username,
                userImg: resp.split('\n')[1].replace('\r','')
            }) )
        } else {
            Swal.fire('Error','ocurrio un error', 'error');
        }
        

    }
}

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});


export const startLogout = () => {
    return ( dispatch ) => {

        localStorage.clear();
        dispatch( logout() );
    }
}

const logout = () => ({ type: types.authLogout })