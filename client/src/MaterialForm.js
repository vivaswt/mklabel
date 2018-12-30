import React, { Component } from 'react';
import List from '@material-ui/core/List';
import AddIcon from '@material-ui/icons/Add';
import AddButton from './AddButton';
import DetailListItem from './DetailListItem'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class MaterialForm extends Component {
  constructor(props) {
    super(props);

    const state = {
      open: false
    };

    getMaterials().forEach((m, i) => {
      state[`material${i}`] = m;
      state[`delete${i}`] = false;
    });

    state.count = getMaterials().length;
    console.log(state);
    this.state = state;

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleDeleteClick(id, e) {
    console.log(`delete ${id}.`);
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

  getRows() {
    const result = [];
    for (let i = 0; i < this.state.count; i++) {
      //if (this.state[`delete${i}`]) continue;
      result.push({
        id: i,
        material: this.state[`material${i}`],
        delete: this.state[`delete${i}`]
      });
    }
    return result;
  }

  render() {
    const list = this.getRows().map(r => (
      <DetailListItem
        key={r.id}
        id={r.id}
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
              label="品名" />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              キャンセル
            </Button>
            <Button onClick={this.handleClose} color="primary">
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
    
function getMaterials() {
  const result = [
          "SP-8LKアオ(HGN11A)",
          "SP-8Kアオ(HGN7)",
          "SP-8Kアオ(HGN7)12R",
          "SP-8Kアオ(HGN7)KUFゲンシ",
          "SP-8Kアオ(HGN7)WT4(6.1R)",
          "SP-8Kアオ(HGN7)WT4(12.2R)",
          "KA-4GシロB",
          "SP-8Eアオ(N6)",
          "SP-ESFR78(N67)",
          "SP-8Eアイボリー(N6)",
          "SP-8Eアイボリー(N6)セマハバ",
          "SP-8Eアイボリー(N6)9R",
          "SP-4BCマルミズ",
          "SP-4BCマルミズ(エージング)",
          "SP-7Kアサギ(HGN7)(3%)",
          "SP-7Kシロ(HGN7)(3%)",
          "SP-7Kチャ",
          "SP-8EAアイボリー",
          "SP-8EBアイボリー",
          "SP-8Eシロ",
          "SP-8Eシロ(N6)",
          "SP-8Eシロ(N6)セマハバ",
          "SP-8KFアオ(L)ウチマキ"
        ];
        return result.sort();
      }
      
export {MaterialForm};
