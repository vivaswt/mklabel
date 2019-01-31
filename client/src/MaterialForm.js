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
import {saveMaterials, loadMaterials} from './Material';
import AppHeader from './AppHeader';

class MaterialForm extends Component {
  constructor(props) {
    super(props);

    const state = {
      open: false,
      inputMaterial: ''
    };

    loadMaterials().forEach((m, i) => {
      state[`material${i}`] = m;
      state[`delete${i}`] = false;
    });

    state.count = loadMaterials().length;
    this.state = state;

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRegist = this.handleRegist.bind(this);
    this.handleMaterialChange = this.handleMaterialChange.bind(this);
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

  materials(state) {
    const result = [];
    for (let i = 0; i < state.count; i++) {
      if (state[`delete${i}`]) continue;
        result.push(state[`material${i}`]);
    }
    return result;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.dataChanged(prevState, this.state)) {
      const materials = this.materials(this.state);
      saveMaterials(materials);
    }
  }

  dataChanged(prevState, state) {
    if (prevState.count !== state.count) return true;
    for (let i = 0; i < state.count; i++) {
      if (prevState[`material${i}`] !== state[`material${i}`]) return true;
      if (prevState[`delete${i}`] !== state[`delete${i}`]) return true;
    }
    return false;
  }

  handleRegist() {
    this.setState(state => {
      const rows = this.getRows(state);
      rows.push({
        id: state.count + 1,
        material: state.inputMaterial,
        delete: false
      });

      rows.sort((a, b) => a.material.localeCompare(b.material));

      const newState = {};
      for (let i = 0; i < rows.length; i++) {
        newState[`material${i}`] = rows[i].material;
        newState[`delete${i}`] = rows[i].delete;
      }
      newState.count = rows.length;
      newState.inputMaterial = '';
      newState.open = false;

      return newState;
    });
  }

  handleMaterialChange(event) {
    this.setState({
      inputMaterial: event.target.value
    });
  }

  getRows(state) {
    const result = [];
    for (let i = 0; i < state.count; i++) {
      result.push({
        id: i,
        material: state[`material${i}`],
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
        primary={r.material}
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
          <DialogTitle id="form-dialog-title">品名追加</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              fullWidth
              margin="dense"
              id="material"
              label="品名"
              value={this.state.inputMaterial}
              onChange={this.handleMaterialChange} />
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

        <AppHeader
          onMenuChange={this.props.onMenuChange}
          title="品名設定">
        </AppHeader>        

        <List>
          {list}
        </List>
      </div>
    );
  }
}

export { MaterialForm };
