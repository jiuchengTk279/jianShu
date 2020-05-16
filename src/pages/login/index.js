import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {LoginWrapper, LoginBox, Input, Button} from './style'
import { actionCreators } from './store'

class Login extends PureComponent {
    render () {

        const { loginStatus } = this.props

        if (!loginStatus) {
            return (
                <LoginWrapper>
                    <LoginBox>
                        <Input placeholder='账号' innerRef={(input) => {this.account = input}}></Input>
                        <Input placeholder='密码' type='password' innerRef={(input) => {this.password = input}}></Input>
                        <Button onClick={() => this.props.login(this.account, this.password)}>登录</Button>
                    </LoginBox>
                </LoginWrapper>
            )
        } else {
            return <Redirect to='/'></Redirect>
        }


    }
}

const mapState = (state) => ({
    loginStatus: state.getIn(['login', 'login'])
})

const mapDispatch = (dispatch) => ({
    login (accountElement, passwordElement) {
        dispatch(actionCreators.login(accountElement, passwordElement))
    }
})

export default connect(mapState, mapDispatch)(Login)