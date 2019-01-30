import { loadWidths as loadData } from './Width';
import React, { Component } from 'react';
import { TextField, MenuItem } from '@material-ui/core';

class WidthSelect extends Component {
  constructor(props) {
    super(props);
    this.data = loadData();
  }

  render() {
    const style = {
      width: '6em'
    };

    return (
      <TextField
        style={style}
        select
        label="巾"
        inputProps = {{
          name: 'inputWidth'
        }}        
        value={this.props.value}
        onChange={this.props.onChange}
      >
        {this.data.map(d => (
          <MenuItem
            key={d}
            value={d}
          >
            {`${d}巾`}
          </MenuItem>
        ))}
      </TextField>
    );
  }
}

export default WidthSelect;