import React, { Component } from 'react';
import List from '@material-ui/core/List';
import AddIcon from '@material-ui/icons/Add';
import AddButton from './AddButton';
import DetailListItem from './DetailListItem'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {saveWidths, loadWidths} from './Width';

class WidthForm extends Component {
  constructor(props) {
    super(props);

    const state = {
      open: false,
      inputWidth: ''
    };

    loadWidths().forEach((w, i) => {
      state[`width${i}`] = w;
      state[`delete${i}`] = false;
    });

    state.count = loadWidths().length;
    this.state = state;

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRegist = this.handleRegist.bind(this);
    this.handleWidthChange = this.handleWidthChange.bind(this);
  }

  handleDeleteClick(id, e) {
    this.setState({
      [`delete${id}`]: true
    });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleAdd() {
    this.setState({ open: true });
  }

  widths(state) {
    const result = [];
    for (let i = 0; i < state.count; i++) {
      if (state[`delete${i}`]) continue;
        result.push(state[`width${i}`]);
    }
    return result;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.dataChanged(prevState, this.state)) {
      const widths = this.widths(this.state);
      saveWidths(widths);
    }
  }

  dataChanged(prevState, state) {
    if (prevState.count !== state.count) return true;
    for (let i = 0; i < state.count; i++) {
      if (prevState[`width${i}`] !== state[`width${i}`]) return true;
      if (prevState[`delete${i}`] !== state[`delete${i}`]) return true;
    }
    return false;
  }

  handleRegist() {
    this.setState(state => {
      const rows = this.getRows(state);
      rows.push({
        id: state.count + 1,
        width: state.inputWidth,
        delete: false
      });

      rows.sort((a, b) => a.width - b.width);

      const newState = {};
      for (let i = 0; i < rows.length; i++) {
        newState[`width${i}`] = rows[i].width;
        newState[`delete${i}`] = rows[i].delete;
      }
      newState.count = rows.length;
      newState.inputWidth = '';
      newState.open = false;

      return newState;
    });
  }

  handleWidthChange(event) {
    this.setState({
      inputWidth: event.target.value
    });
  }

  getRows(state) {
    const result = [];
    for (let i = 0; i < state.count; i++) {
      result.push({
        id: i,
        width: state[`width${i}`],
        delete: state[`delete${i}`]
      });
    }
    return result;
  }

  render() {
    const list = this.getRows(this.state).map(r => (
      <DetailListItem
        key={r.id}
        id={`row${r.id}`}
        primary={r.width}
        delete={r.delete}
        onDeleteClick={e => this.handleDeleteClick(r.id, e)} />
    ));

    return (
      <div>
        <Dialog
          fullWidth={true}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">巾追加</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              fullWidth
              margin="dense"
              id="width"
              label="巾"
              value={this.state.inputWidth}
              onChange={this.handleWidthChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              キャンセル
            </Button>
            <Button onClick={this.handleRegist} color="primary">
              登録
            </Button>
          </DialogActions>
        </Dialog>
        <AddButton onClick={this.handleAdd}>
          <AddIcon />
        </AddButton>
        <List>
          {list}
        </List>
      </div>
    );
  }
}

export { WidthForm };
