import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SideList from './SideList.js';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar
});

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
    const {classes} = this.props;
    
    return (
      <div>
        <AppBar position="fixed">
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

        <div className={classes.appBarSpacer}></div>
      </div>
    );
  }
}

export default withStyles(styles)(AppHeader);