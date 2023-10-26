import { combineReducers } from 'redux'
import theme from './theme'
import user from './user'

const reducers = combineReducers({
    theme,
    user
})

export default reducers