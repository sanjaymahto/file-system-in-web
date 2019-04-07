import React, {Component} from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MuiTreeView from 'material-ui-treeview';
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
                <MuiTreeView tree={[this.props.files]} />
              </div>
          </SwipeableDrawer>
        </div>
    );
}
}


export default (SideBar);
