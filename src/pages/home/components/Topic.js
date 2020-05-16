import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { TopicItem , TopicWrapper} from '../style'

class Topic extends PureComponent {
    render () {

        const { list } = this.props

        return (
            <TopicWrapper>
                {/* <TopicItem>
                    <img className="topic-pic" src="//upload.jianshu.io/collections/images/261938/man-hands-reading-boy-large.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/64/h/64" />
                </TopicItem> */}
                {
                    list.map((item) => {
                        return (
                            <TopicItem key={item.get('id')}>
                                <img className="topic-pic" src={item.get('imgUrl')} alt='' />
                                { item.get('title') }
                            </TopicItem>
                        )
                    })
                }
            </TopicWrapper>
        )
    }
}

const mapState = (state) => ({
    // list: state.get('home').get('topicList')
    list: state.getIn(['home', 'topicList'])
})

export default connect(mapState, null)(Topic)