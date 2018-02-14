//import {startLoading, stopLoading} from './loading'
import {database} from '../firebase'

const FETCH_PRODUCTS = 'products/FETCH_PRODUCTS'
//const PUSH_PRODUCT = 'products/PUSH_PRODUCT'

const setProducts = (products) => ({
    type: FETCH_PRODUCTS,
    products: products
})

export const fetchProducts = () => (dispatch, getState) => {
    database.ref(`/products/food`)
        .on('value', (snapshot)=>
            dispatch(setProducts(Object.entries(snapshot.val()) || {}))
        )
}


const initialState = {
    productsData: null
}


export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                productsData: action.products
            }
        default:
            return state
    }
}