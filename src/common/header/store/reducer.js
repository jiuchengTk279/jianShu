import * as constants from './constants'
import { fromJS } from 'immutable'

// 变为 immutable 对象
// fromJS 会将 JS对象改变为 immutable 对象
const defaultState = fromJS({
    focused: false,
    mouseIn: false,
    list: [],
    // 当前页数
    page: 1,
    // 总页数
    totalPage: 1,
    
})


// immutable.js 里面是 immutable 对象，是不可改变的对象，state 也是修改为不可改变的对象，只能接收
// reducer 可以接收 state，但是不能够修改 state,只有 store 能改变自己的内容，将 state 变为 immutable 对象
export default (state = defaultState, action) => {
    // if (action.type === constants.SEARCH_FOCUS) {
    //     // immutable 对象的 set 方法，会结合之前的 immutable 对象的值和设置的值，返回一个全新的对象
    //     return state.set('focused', true)
    // }

    // if (action.type === constants.SEARCH_BLUR) {
    //     return state.set('focused', false)
    // }

    // if (action.type === constants.CHANGE_LIST) {
    //     return state.set('list', action.data)
    // }

    // return state

    switch(action.type) {
        case constants.SEARCH_FOCUS:
            return state.set('focused', true)
        case constants.SEARCH_BLUR:
            return state.set('focused', false)
        case constants.CHANGE_LIST:
            return state.merge({
                list: action.data,
                totalPage: action.totalPage
            })
            // return state.set('list', action.data).set('totalPage', action.totalPage)
        case constants.MOUSE_ENTER:
            return state.set('mouseIn', true)
        case constants.MOUSE_LEAVE:
            return state.set('mouseIn', false)
        case constants.CHANGE_PAGE:
            return state.set('page', action.page)
            default:
            return state
    }

}