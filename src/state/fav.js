//import {startLoading, stopLoading} from './loading'
import {database} from '../firebase'

const FETCH_FAV = 'fav/FETCH_FAV'
const ADD_FAV = 'fav/ADD_FAV'
const REMOVE_FAV = 'fav/REMOVE_FAV'


const setFav = (fav) => ({
    type: FETCH_FAV,
    fav: fav
})

// const addFav = (fav) => ({
//     type: ADD_FAV,
//     fav: fav
// })

export const fetchFav = () => (dispatch, getState) => {
    const uid = getState().auth.user.uid
    database.ref(`/users/${uid}/favourites`)
        .on('value', (snapshot) =>
            dispatch(setFav(snapshot.val() || []))
        )
}

export const stopSyncingFav = (uid) => (dispatch, getState) => {
    database.ref(`/users/${uid}/favourites`)
        .off('value')
}



export const pushFav = () => (dispatch, getState) => {

}


const initialState = {
    favData: []
}


export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FAV:
            return {
                ...state,
                favData: action.fav
            }
        case ADD_FAV:
            return {
                ...state,
                favData: action.fav
            }
        case REMOVE_FAV:
            return {
                ...state,
                favData: action.fav
            }
        default:
            return state
    }
}