import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { GlobalStyled } from './style.js'
import Header from './common/header'
import store from './store'

class App extends Component {
  render () {
    return (
      // Provider 把数据提供给了内部的组件使用
      <Provider store={store}>
        <GlobalStyled/>
        <Header />
      </Provider>
    )
  }
}

export default App;
