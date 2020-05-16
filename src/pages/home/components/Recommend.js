import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { RecommendItem, RecommendWrapper} from '../style'

class Recommend extends PureComponent {
    render () {

        const { list } = this.props

        return (
            <RecommendWrapper>
                {/* <RecommendItem imgUrl='http://cdn2.jianshu.io/assets/web/banner-s-3-7123fd94750759acf7eca05b871e9d17.png'></RecommendItem>
                <RecommendItem imgUrl='http://cdn2.jianshu.io/assets/web/banner-s-3-7123fd94750759acf7eca05b871e9d17.png'></RecommendItem> */}
                {
                    list.map((item) => (
                        <RecommendItem imgUrl={item.get('imgUrl')} key={item.get('id')}></RecommendItem>
                    ))
                }
            </RecommendWrapper>
        )
    }
}

const mapState = (state) => ({
    list: state.getIn(['home', 'recommendList'])
})

export default connect(mapState, null)(Recommend)