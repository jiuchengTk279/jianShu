import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { ListItem, ListInfo, LoadMore } from '../style'
import { actionCreators } from '../store'
import { Link } from 'react-router-dom'

class List extends PureComponent {
    render () {

        const { list, getMoreList, page } = this.props

        return (
            <div>
                {/* <ListItem>
                    <img className="pic" src="//upload-images.jianshu.io/upload_images/2259045-2986b9be86b01f63?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240" />
                    <ListInfo>
                        <h3 className="title">胡歌</h3>
                        <p className="desc">仙剑奇侠传</p>
                    </ListInfo>
                </ListItem> */}
                {   
                    list.map((item, index) => (
                        <Link key={index} to="/detail">
                            <ListItem>
                                <img className="pic" src={item.get('imgUrl')} alt='' />
                                <ListInfo>
                                    <h3 className="title">{item.get('title')}</h3>
                                    <p className="desc">{item.get('desc')}</p>
                                </ListInfo>
                            </ListItem>
                        </Link>
                    ))
                }

                <LoadMore onClick={() => getMoreList(page)}>更多文字</LoadMore>
            </div>
        )
    }
}

const mapState = (state) => ({
    // list: state.get('home').get('articleList')
    list: state.getIn(['home', 'articleList']),
    page: state.getIn(['home', 'articlePage'])
})


const mapDispatch = (dispatch) => ({
    getMoreList () {
        dispatch(actionCreators.getMoreList())
    }
})

export default connect(mapState, mapDispatch)(List)