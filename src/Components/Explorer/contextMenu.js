import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import './index.scss'

// Material UI styles for context Menu
const styles = theme => ({
    listRoot: {
        maxWidth: 360,
        backgroundColor: '#F6F6F6',
        position: 'absolute',
        top: '120px',
        left: '150px',
        width: '150px',
    }
});

class  ContextMenu extends PureComponent {

    render() {
        const { classes } = this.props;
        return (
        <div className={`${classes.listRoot} contextMenu`} > 
            <List component="nav" ref={ref => {this.root = ref}}>
                <ListItem button onClick={event => this.handleInfoClick()}>
                    <ListItemText primary="Get Info" />
                </ListItem>
                <ListItem button onClick={event => this.handleDeleteClick()}>
                    <ListItemText primary="Delete" />
                </ListItem>
            </List>
        </div>       
        );
    }
}

ContextMenu.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(ContextMenu);

