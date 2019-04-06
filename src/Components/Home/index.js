import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Navbar from '../Navbar/index';
import SkeletonLoader from './skeletonLoader';
import FileComponent from '../Filecomponent/index';
import FolderComponent from '../Foldercomponent/index';
import * as actions from '../../actions/contentActions';
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


class Home extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      contents: null,
    };
  }


  // Function to be called before mounting of the component
  componentWillMount() {
    this.props.getDirectoryContents();
  }

  // Function to be called when the props will get Updated
  componentDidUpdate() {
    this.setState({
      contents: this.props.contents
    }, () => {
      this.getContents()
    })
  }

  /**
   * Function to list all the files and folders in a particular directory
   * 
   * @param  {object} props - Style props
   */
  getContents = () => {
    const { contents } = this.state
    if(!contents){
      return (<SkeletonLoader />); // Load the skeleton files and folders while props are updated
    } else {
      return (
          contents.map((item) => {
            if(item.extension !== "") {
              return(<FileComponent item={item} />)
            }
              return (<FolderComponent item={item} />);
        })
      )
  }
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
              {this.getContents()}
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
  contents: PropTypes.array.isRequired,
  metaData: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  state = state.contentReducer.toJS();
  return {
    contents: state.contents,
    metaData: state.metaData,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    ...actions
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));
