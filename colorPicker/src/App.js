import React, { Component } from 'react';
import ColorPicker from './components/colorPicker';

import "./App.less"

class App extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="react-container">
        <ColorPicker />
      </div>
    )
  }
}

export default App;