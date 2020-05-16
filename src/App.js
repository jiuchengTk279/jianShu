import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { Route, BrowserRouter} from 'react-router-dom'
import { GlobalStyled } from './style.js'
import Header from './common/header'
import store from './store'
import Home from './pages/home'
import Detail from './pages/detail'

class App extends Component {
  render () {
    return (
      // Provider 把数据提供给了内部的组件使用
      <Provider store={store}>
        <div>
          <GlobalStyled/>
          <BrowserRouter>
            <div>
            <Header />
              {/* exact 路径完全和根路径相等 */}
              <Route path="/" exact component={Home}></Route>
              <Route path="/detail/:id" exact component={Detail}></Route>
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    )
  }
}

export default App;
