import { loadMaterials as loadData } from './Material';
import React, { Component } from 'react';
import { TextField, MenuItem } from '@material-ui/core';

class MaterialSelect extends Component {
  constructor(props) {
    super(props);
    this.data = loadData();
  }

  render() {
    const style = {
      width: '18em'
    };

    return (
      <TextField
        style={style}
        select
        label="品名"
        inputProps = {{
          name: 'inputMaterial'
        }}        
        value={this.props.value}
        onChange={this.props.onChange}
      >
        {this.data.map(d => (
          <MenuItem
            key={d}
            value={d}
          >
            {d}
          </MenuItem>
        ))}
      </TextField>
    );
  }
}

export default MaterialSelect;