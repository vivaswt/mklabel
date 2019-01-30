import React, { Component } from 'react';
import {RequestForm} from './RequestForm.js'
import {MaterialForm} from './MaterialForm.js';
import {WidthForm} from './WidthForm.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: 0
    };

    this.handleMenuChange = this.handleMenuChange.bind(this);
  }

  handleMenuChange(value) {
    this.setState({
      menu: value
    });
  }

  render() {
    const {menu} = this.state;

    return (
      <div>
        {menu === 0 && <RequestForm onMenuChange={this.handleMenuChange} />}
        {menu === 1 && <MaterialForm />}
        {menu === 2 && <WidthForm />}
      </div>
    );
  }
}

export default App;
