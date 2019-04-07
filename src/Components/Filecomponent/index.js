import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import FileIcon, { defaultStyles } from 'react-file-icon';


// Material UI styles for paper cards
const styles = theme => ({
    listRoot: {
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'absolute',
        top: '120px',
        left: '150px',
        width: '150px',
        zIndex: '10'
    },
    root: {
    flexGrow: 1,
    },
    paper: {
    height: 100,
    width: 80,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    }
});

class  FileComponent extends PureComponent {

    constructor(props){
        super(props);
        this.state = {
            visible: false,
        }
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this).addEventListener('contextmenu', this._handleContextMenu);
        document.addEventListener('click', this._handleClick);
    };

    componentWillUnmount() {
        ReactDOM.findDOMNode(this).removeEventListener('contextmenu', this._handleContextMenu);
        document.removeEventListener('click', this._handleClick);
    }

    _handleContextMenu = (event) => {
        event.preventDefault();
        this.setState({ visible: true });
    };

    _handleClick = (event) => {
        const { visible } = this.state;
        const wasOutside = !(event.target.contains === this.root);
        
        if (wasOutside && visible) this.setState({ visible: false });
    };

    render() {
        const { classes, item } = this.props;
        const { visible } = this.state;
        
        return (
                <Grid item xs={2} className="grid_content" style={{position:'relative'}}>
                    <Paper className={`${classes.paper} grid_content__paper`}>
                    <FileIcon extension={item.type} {...defaultStyles} />
                        {item.value}
                    </Paper>
                    { (visible || null) ?
                        <div className={classes.listRoot} style={{backgroundColor:'aliceBlue'}}> 
                        <List component="nav" ref={ref => {this.root = ref}}>
                            <ListItem button onClick={event => this.handleInfoClick(item.file)}>
                                <ListItemText primary="Get Info" />
                            </ListItem>
                            <ListItem button onClick={event => this.handleDeleteClick(item.file)}>
                                <ListItemText primary="Delete" />
                            </ListItem>
                        </List>
                        </div>
                        : null}
                </Grid>);
    }
}

FileComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FileComponent);

