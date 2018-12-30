import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    fab: {
        position: 'fixed',
        zIndex: 999,
        right: '2em',
        bottom: '2em'
      }
});

class AddButton extends Component {
    render() {
        const {classes} = this.props;

        return (
            <Button
                classes={classes}
                variant="fab"
                color="primary"
                aria-label="Add"
                onClick={this.props.onClick}>
                <AddIcon />
            </Button>
        );
    }
}

export default withStyles(styles)(AddButton);