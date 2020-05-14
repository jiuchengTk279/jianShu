import * as constants from './constants'
import { fromJS } from 'immutable'
import axios from 'axios'

const changeList = (data) => ({
    type: constants.CHANGE_LIST,
    data: fromJS(data),
    totalPage: Math.ceil(data.length / 10)
})

export const searchFocus = () => ({
    type: constants.SEARCH_FOCUS
})

export const searchBlur = () => ({
    type: constants.SEARCH_BLUR
})

export const mouseEnter = () => ({
    type: constants.MOUSE_ENTER
})

export const mouseLeave = () => ({
    type: constants.MOUSE_LEAVE
})

export const changePage = (page) => ({
    type: constants.CHANGE_PAGE,
    page
})

// redux-thunk 可以使得 action 里面除了返回对象，还可以返回函数
// action 给到  store，store 给到 reducer
// 使用 redux-thunk 发起 ajax 数据，获取到数据后存到 store
export const getList = () => {
    return (dispatch) => {
        axios.get('/api/headerList.json').then((res) => {
            const data = res.data
            dispatch(changeList(data.data))
        }).catch(() => {
            console.log('error')
        })
    }
}