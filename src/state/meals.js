import {database} from '../firebase'

const FETCH_MEALS = 'meals/FETCH_MEALS'


const setMeals = (meals) => ({
    type: FETCH_MEALS,
    meals: meals
})


export const fetchMeals = () => (dispatch, getState) => {
    const uid = getState().auth.user.uid
    database.ref(`/users/${uid}/meals`)
        .on('value', (snapshot) => {
            //console.log('Syncing', uid)
            dispatch(setMeals(snapshot.val() || {}))
        })
}

export const stopSyncingMeals = (uid) => (dispatch, getState) => {
    database.ref(`/users/${uid}/meals`)
        .off('value')
}


const initialState = {
    mealsData: {}
}


export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MEALS:
            return {
                ...state,
                mealsData: action.meals
            }
        default:
            return state
    }
}