import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import './MaterialForm.css';
import AddButton from './AddButton';

class MaterialForm extends Component {
  constructor(props) {
    super(props);

    const state = {};
    getMaterials().forEach((m, i) => {
      state[`material${i}`] = m;
      state[`delete${i}`] = false;
    });
    state.count = getMaterials().length;
    console.log(state);
    this.state = state;

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleDeleteClick(id, e) {
    console.log(`delete ${id}.`);
    this.setState({
      [`delete${id}`]: true
    });
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
    const listItemStyle = {
      height: '50%',
      transition: 'height 1s ease'
    };

    const list = this.getRows().map(r =>(
      <ListItem key={r.id}>
        <ListItemText primary={r.material} />
        <ListItemSecondaryAction>
          <IconButton
            aria-label="Delete"
            onClick={e=>this.handleDeleteClick(r.id, e)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));

    return (
      <div>
        <AddButton>
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
