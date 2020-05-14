import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

// 有了 redux-thunk 中间件就可以在 action 里面派发异步数据操作了
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
))

export default store