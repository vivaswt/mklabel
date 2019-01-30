import React, { Component } from 'react';
import { TextField, MenuItem } from '@material-ui/core';

class PageSelect extends Component {
  constructor(props) {
    super(props);
    this.data = loadData();
  }

  render() {
    const style = {
      width: '5em'
    };

    return (
      <TextField
        style={style}
        select
        label="枚数"
        inputProps = {{
          name: 'inputPage'
        }}        
        value={this.props.value}
        onChange={this.props.onChange}
      >
        {this.data.map(d => (
          <MenuItem
            key={d}
            value={d}
          >
            {`${d}枚`}
          </MenuItem>
        ))}
      </TextField>
    );
  }
}

function loadData() {
  const result = [];
  for (let i = 1; i < 21; i++) {
    result.push(i);
  }
  return result;
}

export default PageSelect;