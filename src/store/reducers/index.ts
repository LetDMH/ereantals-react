import { combineReducers } from 'redux'
import theme from './theme'
import user from './user'
import app from './app'
import permission from './permission'

const reducers = combineReducers({
    theme,
    user,
    app,
    permission
})

export default reducers