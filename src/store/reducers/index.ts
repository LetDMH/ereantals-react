import { combineReducers } from 'redux'
import theme from './theme'
import user from './user'
import app from './app'
import permission from './permission'
import breadcrumb from './breadcrumb'

const reducers = combineReducers({
    theme,
    user,
    app,
    permission,
    breadcrumb
})

export default reducers