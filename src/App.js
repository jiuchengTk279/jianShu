import React, { Component } from 'react';
import { GlobalStyled } from './style.js'
import Header from './common/header'

class App extends Component {
  render () {
    return (
      <div>
        <GlobalStyled/>
        <Header />
      </div>
    )
  }
}

export default App;
