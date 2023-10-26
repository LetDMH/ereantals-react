import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducers, {}, applyMiddleware(sagaMiddleware))

// export type RootState = ReturnType<typeof store.getState>;

export default store