import React from 'react';
import PropTypes from 'prop-types';
import FileIcon, { defaultStyles } from 'react-file-icon';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import './index.scss';


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

function SkeletonLoader(props) {
    const { classes } = props;
    return (
        <React.Fragment>
            <Grid item xs={2} className="grid_content">
            <Paper className={`${classes.paper} grid_content__paper`}>
            <FileIcon extension="docx" {...defaultStyles} />
            </Paper>
            </Grid>
            <Grid item xs={2} className="grid_content">
            <Paper className={`${classes.paper} grid_content__paper`}>
            <FileIcon extension="docx" {...defaultStyles} />
            </Paper>
            </Grid>
            <Grid item xs={2} className="grid_content">
            <Paper className={`${classes.paper} grid_content__paper`}>
            <FileIcon extension="docx" {...defaultStyles} />
            </Paper>
            </Grid>
            <Grid item xs={2} className="grid_content">
            <Paper className={`${classes.paper} grid_content__paper`}>
            <FileIcon extension="docx" {...defaultStyles} />
            </Paper>
            </Grid>
            <Grid item xs={2} className="grid_content">
            <Paper className={`${classes.paper} directory_folder grid_content__paper`}>
                <div className="directory_folder__image">
                <img src="https://img.icons8.com/nolan/64/000000/opened-folder.png" alt="Folder"/>
                Folder
                </div>
            </Paper>
            </Grid>
    </React.Fragment>)
}

SkeletonLoader.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(SkeletonLoader);
    