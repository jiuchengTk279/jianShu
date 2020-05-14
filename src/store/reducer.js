import { combineReducers } from 'redux-immutable'
import { reducer as headerReducer} from '../common/header/store'

// combineReducers 可以将小的 reducer 合并为大的 reducer
const reducer =  combineReducers({
    header: headerReducer
})

export default reducer