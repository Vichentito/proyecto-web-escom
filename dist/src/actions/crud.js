import { fetchList,fetchCreate, fetchDelete, fetchActualizarImg} from '../helpers/fetch';
import { types } from '../types/types';
import Swal from 'sweetalert2';



export const eventStartLoading = () => {
    return async(dispatch) => {

        try {
            const resp = await fetchList('leer','GET');
            const list = resp;
            dispatch( eventLoaded( list ) );

        } catch (error) {
            console.log(error)
        }

    }
}
export const startCreate = ( id, valores ) => {
    return async( dispatch ) => {
        const resp = await fetchCreate( 'crear', { id, valores }, 'GET' );
        if( resp==='OK\r\n' ) {
            alert("se guardo con exito")
        } else {
            Swal.fire('Error','ocurrio un error', 'error');
        }
        

    }
}

export const startActualizar = ( id, valores ) => {
    return async( dispatch ) => {
        const resp = await fetchCreate( 'actualizar', { id, valores }, 'GET' );
        if( resp==='OK\r\n' ) {
            alert("se actualizo con exito")
        } else {
            Swal.fire('Error','ocurrio un error', 'error');
        }
        

    }
}

export const startActualizarImg = ( id, nameimg ) => {
    return async( dispatch ) => {
        const resp = await fetchActualizarImg( 'UpdateImg', { id, nameimg }, 'GET' );

        if( resp.split('\n')[0].replace('\r','')==='OK' ) {
            dispatch( login({
                userImg: resp.split('\n')[1].replace('\r','')
            }) )
            alert("se actualizo con exito")
        } else {
            Swal.fire('Error','ocurrio un error', 'error');
        }
        

    }
}

export const startActual = ( id,valores ) => {
    return async( dispatch ) => {
        dispatch( eventUpdated( {id,valores} ) );

    }
}
export const startDelete = ( id ) => {
    return async( dispatch ) => {
        const resp = await fetchDelete( 'borrar', { id }, 'GET' );
        if( resp==='OK\r\n' ) {
            alert("se elimino con exito")
            const resp = await fetchList('leer','GET');
            const list = resp;
            dispatch( eventLoaded( list ) );
        } else {
            Swal.fire('Error','ocurrio un error', 'error');
        }
        

    }
}

const eventUpdated = (events) => ({
    type: types.eventUpdated,
    payload: events
})

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});