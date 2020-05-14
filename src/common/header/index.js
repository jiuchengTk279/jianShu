import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import {  connect } from 'react-redux'
import  { actionCreators }  from './store'
import { HeaderWrapper, Logo, Nav, NavItem, NavSearch, Addition, Button, SearchWrapper, SearchInfo, SearchInfoTitle, SearchInfoSwitch, SearchInfoItem, SearchInfoList} from './style'
import { GlobalStyled } from '../../statics/iconfont/iconfont.js'


class Header extends Component {

    // 搜索框聚焦显示列表内容，移除不显示内容
    getListArea () {

        const { focused, list, page, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, handleChangePage } = this.props
        // 将 list 由 immutable 对象变为 JS 对象
        const newList = list.toJS()
        const pageList = []

        if (newList.length) {
            for( let i = (page - 1) * 10; i< page * 10; i++) {
                pageList.push(
                    <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
                )
            }
        }

        if (focused || mouseIn) {
            return (
                <SearchInfo onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch onClick={() => handleChangePage(page, totalPage, this.spinIcon)}>
                            <i ref={(icon) => {this.spinIcon = icon}} className="iconfont spin">&#xe851;</i>
                            换一批
                        </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {
                            // list.map((item) => {
                            //     return <SearchInfoItem key={item}>{item}</SearchInfoItem>
                            // })

                            pageList
                        }
                    </SearchInfoList>
                </SearchInfo>
            )
        } else {
            return null
        }
    }


    render() {
        
        const {focused, handleInputFocus, handleInputBlur, list } = this.props

        return (
            <HeaderWrapper>
            <GlobalStyled></GlobalStyled>
            <Logo />
            <Nav>
                <NavItem className="left active">首页</NavItem>
                <NavItem className="left">下载App</NavItem>
                <NavItem className="right">登录</NavItem>
                <NavItem className="right">
                    <i className="iconfont">&#xe636;</i>
                </NavItem>
                <SearchWrapper>
                    <CSSTransition in={focused} timeout={200} classNames="slide">
                        <NavSearch className={focused ? 'focused' : ''}  onFocus={() => handleInputFocus(list)} onBlur={handleInputBlur}></NavSearch>
                    </CSSTransition>
                    <i className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}>&#xe614;</i>
                    { this.getListArea()}
                </SearchWrapper>
            </Nav>
            <Addition>
                <Button className="writting">
                    <i className="iconfont">&#xe615;</i>
                    写文章
                </Button>
                <Button className="reg">注册</Button>
            </Addition>
        </HeaderWrapper>
        )
    }
}




// class Header extends Component {

//     // constructor (props) {
//     //     super(props)
//     //     // this.state = {
//     //     //     focused: false
//     //     // }
//     //     this.handleInputFocus = this.handleInputFocus.bind(this)
//     //     this.handleInputBlur = this.handleInputBlur.bind(this)
//     // }

//     // render () {
//     //     return (
//     //         <HeaderWrapper>
//     //             <GlobalStyled></GlobalStyled>
//     //             <Logo />
//     //             <Nav>
//     //                 <NavItem className="left active">首页</NavItem>
//     //                 <NavItem className="left">下载App</NavItem>
//     //                 <NavItem className="right">登录</NavItem>
//     //                 <NavItem className="right">
//     //                     <i className="iconfont">&#xe636;</i>
//     //                 </NavItem>
//     //                 <SearchWrapper>
//     //                     <CSSTransition in={this.props.focused} timeout={200} classNames="slide">
//     //                         <NavSearch className={this.props.focused ? 'focused' : ''}  onFocus={this.props.handleInputFocus} onBlur={this.props.handleInputBlur}></NavSearch>
//     //                     </CSSTransition>
//     //                     <i className={this.props.focused ? 'focused iconfont' : 'iconfont'}>&#xe614;</i>
//     //                 </SearchWrapper>
//     //             </Nav>
//     //             <Addition>
//     //                 <Button className="writting">
//     //                     <i className="iconfont">&#xe615;</i>
//     //                     写文章
//     //                 </Button>
//     //                 <Button className="reg">注册</Button>
//     //             </Addition>
//     //         </HeaderWrapper>
//     //     )
//     // }

//     // // 搜索框聚焦事件
//     // handleInputFocus () {
//     //     this.setState({
//     //         focused: true
//     //     })
//     // }

//     // // 搜索框离焦事件
//     // handleInputBlur () {
//     //     this.setState({
//     //         focused: false
//     //     })
//     // }
// }


// 将这个组件和store 进行连接，将 store 里面的数据如何映射到 props
const mapStateToProps = (state) => {
    return {
        // focused: state.get('header').get('focused')
        focused: state.getIn(['header', 'focused']),
        list: state.getIn(['header', 'list']),
        page: state.getIn(['header', 'page']),
        totalPage: state.getIn(['header', 'totalPage']),
        mouseIn: state.getIn(['header', 'mouseIn'])
    }
}

// 将这个组件和store 进行连接，组件改变 store 里面的数据通过 dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        // 搜索框聚焦事件
        handleInputFocus (list) {
            (list.size === 0) && dispatch(actionCreators.getList())
            // dispatch(actionCreators.getList())
            dispatch(actionCreators.searchFocus())
        },
        // 搜索框离焦事件
        handleInputBlur () {
            dispatch(actionCreators.searchBlur())
        },
        // 鼠标移入事件
        handleMouseEnter () {
            dispatch(actionCreators.mouseEnter())
        },
        // 鼠标移出事件
        handleMouseLeave () {
            dispatch(actionCreators.mouseLeave())
        },
        handleChangePage (page, totalPage, spin) {

            let originAngle = spin.style.transform.replace(/[^0-9]/ig, '')
            if (originAngle) {
                originAngle = parseInt(originAngle, 10)
            } else {
                originAngle = 0
            }
            spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)'

            // dispatch(actionCreators.changePage())
            if (page < totalPage) {
                dispatch(actionCreators.changePage(page + 1))
            } else {
                dispatch(actionCreators.changePage(1))
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)