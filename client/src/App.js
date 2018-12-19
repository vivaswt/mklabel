import React, { Component } from 'react';
import './App.css';
import {RequestForm} from './RequestForm.js'
import {MaterialForm} from './MaterialForm.js';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: 0,
      menuOpen: false,
      requests: createRequests(),
      materials: getMaterials(),
      widths: getWidths()
    };

    this.handleMenuChange = this.handleMenuChange.bind(this);
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMaterialChange = this.handleMaterialChange.bind(this);
    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handleMenuChange(value) {
    this.setState({
      menu: value
    });
  }

  handleMenuOpen(value) {
    this.setState({
      menuOpen: value
    });
  }

  handleMaterialChange(id, value) {
    this.setState(state => {
      state.requests.get(id).material = value;
      return state.requests;
    });
  }

  handleWidthChange(id, value) {
    this.setState(state => {
      state.requests.get(id).width = value;
      return state.requests;
    });
  }

  handlePageChange(id, value) {
    this.setState(state => {
      state.requests.get(id).page = value;
      return state.requests;
    });
  }

  render() {
    const {menu} = this.state;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit"
              onClick={() => this.handleMenuOpen(true)}
              >
              <MenuIcon />
            </IconButton>
          {menu === 0 && 'ラベル作成'}
          {menu === 1 && '品名設定'}
          {menu === 2 && '巾設定'}
          </Toolbar>
        </AppBar>
        <SideList
          open={this.state.menuOpen}
          changeOpenState={this.handleMenuOpen}
          changeMenu={this.handleMenuChange}
          />
        {menu == 0 && <RequestForm
          requests={this.state.requests}
          materials={this.state.materials}
          widths={this.state.widths}
          onMaterialChange={this.handleMaterialChange}
          onWidthChange={this.handleWidthChange}
          onPageChange={this.handlePageChange} />}
        {menu == 1 && <MaterialForm materials={this.state.materials}/>}
      </div>
    );
  }
}

class SideList extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleClose(e) {
    this.props.changeOpenState(false);
  }

  handleMenuClick(menuNumber, e) {
    console.log(menuNumber);
    this.props.changeMenu(menuNumber);
    this.props.changeOpenState(false);
  }

  render() {
    return (
      <Drawer
        open={this.props.open}
        onClose={this.handleClose}
      >
        <div role="button">
          <List>
            <ListItem
              button
              key="ラベル編集"
              name="label"
              onClick={e => this.handleMenuClick(0, e)}>
              <ListItemText primary="ラベル編集" />
            </ListItem>
            <ListItem
              button
              key="品名設定"
              onClick={e => this.handleMenuClick(1, e)}>
              <ListItemText primary="品名設定" />
            </ListItem>
            <ListItem
              button
              key="巾設定"
              onClick={e => this.handleMenuClick(2, e)}>
              <ListItemText primary="巾設定" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    );
  }
}

function createRequests() {
  let requests = new Map();
  for (let i = 0; i < 10; i++) {
    requests.set(i, {
      material: '',
      width: '',
      page: 0
    });
  }
  return requests;
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

function getWidths() {
  const result = [
    785,
    905,
    1000,
    1020,
    1040,
    1100,
    1120,
    1130,
    1230
  ];
  return result.sort((a, b) => a - b);
}

export default App;
