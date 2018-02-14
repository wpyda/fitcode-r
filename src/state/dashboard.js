//import {startLoading, stopLoading} from './loading'
import {database} from '../firebase'

const FETCH_USERS = 'products/FETCH_USERS'

const setUsers = (users) => ({
    type: FETCH_USERS,
    users: users
})

export const fetchUsers = () => (dispatch, getState) => {
    database.ref(`/users`)
        .on('value', (snapshot)=>
            dispatch(setUsers(Object.keys(snapshot.val()) || {}))
        )
}


const initialState = {
    usersCount: null
}


export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return {
                ...state,
                usersCount: action.users
            }
        default:
            return state
    }
}