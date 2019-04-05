import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FileIcon, { defaultStyles } from 'react-file-icon';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Navbar from '../Navbar/index';
// import Sidebar from '../Sidebar/index';
import './index.scss';

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


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: null,
    };
  }


  /**
   * Function to list all the files and folders in a particular directory
   * 
   * @param  {object} props - Style props
   */
  getContents = (props) => {
    const { classes } = props;
    return (
      <React.Fragment>
        <Grid item xs={2} className="grid_content">
          <Paper className={`${classes.paper} grid_content__paper`}>
          <FileIcon extension="docx" {...defaultStyles.docx} />
          File Name
          </Paper>
        </Grid>
        <Grid item xs={2} className="grid_content">
          <Paper className={`${classes.paper} grid_content__paper`}>
          <FileIcon extension="ppt" {...defaultStyles.ppt} />
          File Name
          </Paper>
        </Grid>
        <Grid item xs={2} className="grid_content">
          <Paper className={`${classes.paper} grid_content__paper`}>
          <FileIcon extension="pdf" {...defaultStyles.pdf} />
          File Name
          </Paper>
        </Grid>
        <Grid item xs={2} className="grid_content">
          <Paper className={`${classes.paper} grid_content__paper`}>
          <FileIcon extension="html" {...defaultStyles.html} />
          File Name
          </Paper>
        </Grid>
        <Grid item xs={2} className="grid_content">
          <Paper className={`${classes.paper} grid_content__paper`}>
          <FileIcon extension="png" {...defaultStyles.png} />
          File Name
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
      </React.Fragment>
    );
  }


  render() {
    const { classes } = this.props;
    return (
      <div>
      <Navbar />
      <br/>
      <Grid className={classes.root}>
        <Grid item xs={12}>
        <Grid container className={classes.demo} spacing={16}>
              {this.getContents(this.props)}
          <Grid item xs={2} className="grid_content">
            <Paper className={`${classes.paper} directory_folder grid_content__paper`}>
              <div className="directory_folder__image">
                <img src={window.location.origin + '/addFileOrFolder.svg'} alt="addFileOrFolder"/>
              </div>
            </Paper>
          </Grid>
        </Grid>
        </Grid>
      </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
