import { combineReducers } from 'redux'
import theme from './theme'
import user from './user'
import app from './app'

const reducers = combineReducers({
    theme,
    user,
    app
})

export default reducers