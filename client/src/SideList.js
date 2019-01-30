import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
      this.props.onMenuChange(menuNumber);
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
  
  export default SideList;