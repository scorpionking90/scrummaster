import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers/rootReducers'
import thunk from 'redux-thunk'

export default function configureStore() {
    const enhancers = []

    const isDevelopment = process.env.NODE_ENV === 'development'
    if (
        isDevelopment &&
        typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION__
    ) {
        enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())
    }
    const middleware = [thunk]
    return createStore(
        rootReducer,
        compose(applyMiddleware(...middleware), ...enhancers)
    )
}