import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { Route, BrowserRouter} from 'react-router-dom'
import { GlobalStyled } from './style.js'
import Header from './common/header'
import store from './store'
import Home from './pages/home'
import Detail from './pages/detail/loadable.js'
import Login from './pages/login'
import Write from './pages/write'

class App extends Component {
  render () {
    return (
      // Provider 把数据提供给了内部的组件使用
      <Provider store={store}>
          <BrowserRouter>
            <div>
              <GlobalStyled/>
              <Header />
              {/* exact 路径完全和根路径相等 */}
              <Route path="/" exact component={Home}></Route>
              <Route path="/login" exact component={Login}></Route>
              <Route path='/write' exact component={Write}></Route>
              <Route path="/detail/:id" exact component={Detail}></Route>
            </div>
          </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
