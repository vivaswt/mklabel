import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class RequestForm extends Component {
  reqToJSON(requests) {
    return JSON.stringify(
      [...requests.values()].filter(r => r.page >0));
  }

  render() {
    return (
      <div>
        <RequestList
          requests={this.props.requests}
          materials={this.props.materials}
          widths={this.props.widths}
          onMaterialChange={this.props.onMaterialChange}
          onWidthChange={this.props.onWidthChange}
          onPageChange={this.props.onPageChange} />

        <form action="/pdf">
          <input
            name="requests"
            type="hidden"
            value={this.reqToJSON(this.props.requests)} />

          <Button
            variant="outlined"
            //color="primary"
            formMethod="post"
            formTarget="_blank"
            type="submit">
          ラベル作成
          </Button>
        </form>
      </div>
    );
  }
}

class RequestList extends Component {
  constructor(props) {
    super(props);
    this.handleMaterialChange =
    this.handleMaterialChange.bind(this);
    this.handleWidthChange =
    this.handleWidthChange.bind(this);
    this.handlePageChange =
    this.handlePageChange.bind(this);
  }

  handleMaterialChange(e) {
    const id = parseInt(e.target.name.substring(8));
    this.props.onMaterialChange(id, e.target.value);
  }

  handleWidthChange(e) {
    const id = parseInt(e.target.name.substring(5));
    this.props.onWidthChange(id, e.target.value);
  }

  handlePageChange(e) {
    const id = parseInt(e.target.name.substring(4));
    this.props.onPageChange(id, e.target.value);
  }

  materialMenuItems() {
    return this.props.materials.map(m => (
      <MenuItem
        key={m} value={m}>{m}</MenuItem>
    ));
  }

  render() {
    const requests = this.props.requests;
    const materialStyle = {
      'font-size': '11px',
      width: '18em',
      margin: '0.25em'
    };
    const widthStyle = {
      'font-size': '12px',
      width: '6em',
      margin: '0.25em',
      'textAlign': 'right'
    };
    const pageStyle = {
      'font-size': '12px',
      width: '5em',
      margin: '0.25em',
      'textAlign': 'right'
    };

    const pages = [];
    for (let i = 0; i < 21; i++) pages.push(i);
    const pageItems = pages.map(p => (
      <MenuItem key={p} value={p}>{p}枚</MenuItem>
    ));

    const widthItems = this.props.widths.map(w => (
      <MenuItem key={w} value={w}>{w}巾</MenuItem>
    ));
    widthItems.unshift((
      <MenuItem key="-" value=""></MenuItem>
    ));
    
    return mtoa(requests).map(([id, req]) =>
      <div key={id}>
        <Select
          style={materialStyle}
          inputProps = {{
            name: `material${id}`
          }}
          onChange={this.handleMaterialChange}
          value={req.material}>
          <MenuItem ke="space" value=""></MenuItem>
          {this.materialMenuItems()}
        </Select>
        <Select
          style={widthStyle}
          inputProps = {{
            name: `width${id}`
          }}
          onChange={this.handleWidthChange}
          value={req.width}>
          {widthItems}
        </Select>
        <Select
          style={pageStyle}
          inputProps = {{
            name: `page${id}`
          }}
          onChange={this.handlePageChange}
          value={req.page}>
          {pageItems}
        </Select>
      </div>
    );
  }
}

function mtoa(m) {
  let result = [];
  m.forEach((v, k) => result.push([k, v]));
  return result;
}

export {RequestForm};
