import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import "./index.scss"

// Material UI styles for paper cards
const styles = theme => ({
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

class  FolderComponent extends PureComponent {
    render() {
        const { classes, item } = this.props;
        return (
            <Grid item xs={2} className="grid_content">
                <Paper onDoubleClick={()=>this.props.updateClickEvent(item)} className={`${classes.paper} directory_folder grid_content__paper`}>
                    <div>
                        <img src="https://img.icons8.com/nolan/64/000000/opened-folder.png" alt="Folder"/>
                            <p className="directory_folder__title">{item.value}</p>
                    </div>
                </Paper>
            </Grid>);
    }
}

FolderComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FolderComponent);

