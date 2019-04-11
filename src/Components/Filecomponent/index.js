import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import FileIcon, { defaultStyles } from 'react-file-icon';
import './index.scss'

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

class  FileComponent extends PureComponent {

    render() {
        const { classes, item } = this.props;
        return (
                <Grid item xs={2} className="grid_content">
                    <Paper className={`${classes.paper} grid_content__paper`}>
                    <FileIcon extension={item.type} {...defaultStyles} />
                        <p className="grid_content__title">{item.value}</p>
                    </Paper>
                </Grid>);
    }
}

FileComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FileComponent);

