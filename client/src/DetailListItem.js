import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    container: {
        height: '3em'
    },
    containerDelete: {
        overflow: 'hidden',
        height: '0em',
        transition: 'height 300ms 0s ease'
    }
});

const deleteStyles = theme => ({
    container: {
        overflow: 'hidden',
        height: '0em',
        transition: 'height 300ms 0s ease'
    }
});

class DetailListItem extends Component {
    render() {
        const {classes} = this.props;
        console.log(classes);

        return (
            <ListItem
                key={this.props.id}
                classes={{
                    container: (
                        this.props.delete ?
                        classes.containerDelete :
                        classes.container
                    )
                }}>
                <ListItemText primary={this.props.primary} />
                <ListItemSecondaryAction>
                    <IconButton
                        aria-label="Delete"
                        onClick={this.props.onDeleteClick}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default withStyles(styles)(DetailListItem);