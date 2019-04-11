import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { searchNode } from '../../utils/index';
import Sidebar from '../Sidebar/index'
import './index.scss'

// Material UI styles for sideBar
const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class  Navbar extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
    }
  }

  /**
   * function to update the current directory path
   * 
   * @param  {Object} currentNode - current Node
   */
  updatePath(currentNode) {
    const {parentPath} = currentNode
    if(parentPath) {
      this.props.updateCurrentNode(searchNode(this.props.fileSystem, parentPath));
    }
  }

  /**
   * function to set search query in search Bar.
   * 
   * @param  {Object} event - event Object
   */
  setQuery(event){
    this.setState({
      query: event.target.value
    })
  }

  /**
   * function to update the current directory according to search value
   * 
   */
  updateCurrentSearch = () => {
    let node = [];
    let searchContent = this.state.query;
    let currentNode = this.props.currentNode;
    let curNode = this.props.currentNode.nodes;
    for(let i=0; i<curNode.length;i++){ 
      if(curNode[i].value === searchContent){
            node.push(curNode[i])
            break;
      }
    }
    if(!node.length){
      this.props.updateCurrentNode(searchNode(this.props.fileSystem, this.props.currentNode.path));
    } else {
    currentNode.nodes = node
    this.props.updateSearchNode(this.props.fileSystem,currentNode);
    }
    
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Sidebar files={this.props.fileSystem} 
                updateExplorer={this.props.updateCurrentNode} rootPath={this.props.fileSystem.path}/>
              <img src="/upArrow.svg" alt="uparrow"  className="back_arrow" onClick={this.updatePath.bind(this, this.props.currentNode)} /> 
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                <span style={{paddingLeft:'5px', paddingRight:'5px'}}>{this.props.currentNode.path}</span>
              </Typography>
              <div className={classes.grow} />
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                <InputBase onChange={this.setQuery.bind(this)} onKeyPress={event => {
                      if (event.key === 'Enter') {
                          this.updateCurrentSearch()
                      }
                  }}
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
                </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default (withStyles(styles)(Navbar));

