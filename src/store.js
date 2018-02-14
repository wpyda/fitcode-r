import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import productsReducer from './state/products'
import favReducer from './state/fav'
import mealsReducer from './state/meals'
import loadingReducer from './state/loading'
import authReducer, {initAuth} from './state/auth'
import {fetchProducts} from './state/products'
import dashboardReducer, {fetchUsers} from './state/dashboard'

const reducer = combineReducers({
    products: productsReducer,
    fav: favReducer,
    meals: mealsReducer,
    loading: loadingReducer,
    auth: authReducer,
    dashboard: dashboardReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)


store.dispatch(initAuth())
store.dispatch(fetchProducts())
store.dispatch(fetchUsers())


export default store