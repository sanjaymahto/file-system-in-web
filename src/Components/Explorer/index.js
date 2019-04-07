import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FileComponent from '../Filecomponent/index';
import FolderComponent from '../Foldercomponent/index';
import ContextMenu from './contextMenu';
import InfoModal from '../Createfileorfoldermodal/index';
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
      visible: false,
      modalStatus: false
    };
  }

  componentDidMount() {
    document.addEventListener('contextmenu', this._handleContextMenu);
    document.addEventListener('click', this._handleClick);
};

componentWillUnmount() {
    document.removeEventListener('contextmenu', this._handleContextMenu);
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
    const { visible } = this.state;
    return (
      <div>
        <br/>
      <Grid className={classes.root}>
        <Grid item xs={12}>
          <Grid container className={classes.gird} spacing={16}>
              {this.getContents()}
              { (visible || null) ? <ContextMenu /> : null}
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



export default (withStyles(styles)(Explorer));
