import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { MenuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
import ContextMenu from './contextMenu';
import FileComponent from '../Filecomponent/index';
import FolderComponent from '../Foldercomponent/index';
import InfoModal from '../Createfileorfoldermodal/index';
import * as actions from './action';
import './index.scss';


// Material UI styles for paper cards
const styles = theme => ({
  grid: {
    position: 'relative'
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

class Explorer extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      currentNode: props.currentNode,
      modalStatus: false
    };
  }

  /**
   * Function to list all the files and folders in a particular directory
   * 
   * @param  {object} props - Style props
   */
  getContents = () => {
      return (
          this.props.currentNode.nodes.map((item, index) => {
            if(!item.isFolder) {
              return(<FileComponent key={index} item={item} />)
            }
              return (<FolderComponent key={index} item={item} 
                      updateClickEvent={this.props.updateCurrentNode} />);
        })
      )
  }

  /**
   * function to open modal on clicking add button
   */
  openModal() {
    this.setState({
      modalStatus: true
    })
  }

  /**
   * function to close modal on clicking add button
   */
  closeModal() {
    this.setState({
      modalStatus: false
    })
  }


  render() {
    const { classes } = this.props;
    return (
      <div>
        <br/>
      <Grid className={classes.root}>
        <MenuProvider id='menu_id'>
          <Grid item xs={12}>
            <Grid container className={classes.gird} spacing={16}>
              {this.getContents()}
            </Grid>
          </Grid>
        </MenuProvider>
        <Grid item xs={12}>
          <Grid container className={classes.gird} spacing={16}>
            <Grid item xs={2} className="grid_content">
              <Paper onClick={this.openModal.bind(this)} className={`${classes.paper} directory_folder grid_content__paper`}>
                <div className="directory_folder__image">
                  <img src={'./addFileOrFolder.svg'} alt="addFileOrFolder"/>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* Context-menu */}
      <ContextMenu
      fileSystem={this.props.fileSystem}
      updateDirectory={this.props.updateDirectory}
      deleteFile={this.props.deleteFile}
      deleteFolder={this.props.deleteFolder}
      resetDeleteFlag={this.props.resetDeleteFlag}
      enterIntoDirectory={this.props.updateCurrentNode}
      currentNode={this.props.currentNode}
      />
      {/* file/Folder Info Modal */}
      {this.state.modalStatus ? <InfoModal 
      fileSystem={this.props.fileSystem}
      updateDirectory={this.props.updateDirectory}
      currentNode={this.props.currentNode}
      closeModal={this.closeModal.bind(this)}/>: null}
      </div>
    );
  }
}

Explorer.propTypes = {
  classes: PropTypes.object,
};


const mapStateToProps = (state) => {
  state = state.contentReducer.toJS();
  return {
    deleteFlag: state.deleteFlag
  };
  }; 

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
      ...actions
  }, dispatch);
  };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Explorer));


