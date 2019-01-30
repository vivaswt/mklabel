import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SideList from './SideList.js';

class AppHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sideListOpen: false
    };

    this.handleSideListOpen = this.handleSideListOpen.bind(this);
  }

  handleSideListOpen(value) {
    this.setState({
      sideListOpen: value
    });
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={() => this.handleSideListOpen(true)}>
              <MenuIcon />
            </IconButton>
            <span style={{'flexGrow': 1}}>{this.props.title}</span>
            {this.props.children}
          </Toolbar>
        </AppBar>

        <SideList
          open={this.state.sideListOpen}
          changeOpenState={this.handleSideListOpen}
          onMenuChange={this.props.onMenuChange}
        />
      </div>
    );
  }
}

export default AppHeader;