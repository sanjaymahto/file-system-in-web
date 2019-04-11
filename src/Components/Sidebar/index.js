import React, {Component} from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MuiTreeView from 'material-ui-treeview';
import { searchNode } from '../../utils/index';
import './index.scss'

class SideBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
          left: false,
        };
    }

  /**
   * function to toggle the sidebar from left side
   * 
   * @param  {Object} side
   * @param  {Object} open
   */
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  /**
   * function to trigger when clicking an directory from sidebar 
   * 
   * @param  {Object} event
   */
  enterDirectoryEvent(node) {
    if(node.value) {
      let textArray = node.value.split('.');
      if(textArray.length === 1){
        this.props.updateExplorer(searchNode(this.props.files, `${node.parent.path}/${node.value}`));
      } 
  }
  }


  render() {
    return (
        <div>
          <img className="hamburger_icon" onClick={this.toggleDrawer('left', true)} src="./hamburger.svg" alt="hamburger" />
          <SwipeableDrawer
            open={this.state.left}
            onClose={this.toggleDrawer('left', false)}
            onOpen={this.toggleDrawer('left', true)}>
              <div  className="directory_sidebar" tabIndex={0} role="button" onClick={this.toggleDrawer('top', false)}
                onKeyDown={this.toggleDrawer('top', false)}>
                <p style={{paddingLeft:'5px'}}>{this.props.rootPath}</p>
                <MuiTreeView onLeafClick={this.enterDirectoryEvent.bind(this)}  tree={[this.props.files]} />
              </div>
          </SwipeableDrawer>
        </div>
    );
}
}


export default (SideBar);
