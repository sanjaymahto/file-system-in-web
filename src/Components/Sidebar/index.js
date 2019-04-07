import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MuiTreeView from 'material-ui-treeview';


class SideBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
          left: false,
          fileSystem: props.fileSystem
        };
    }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    return (
        <div>
          <img onClick={this.toggleDrawer('left', true)} src="./hamburger.svg" alt="hamburger" style={{width:'22px', cursor:'pointer'}} />
          <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
          >
            <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('top', false)}
                onKeyDown={this.toggleDrawer('top', false)}
            >
            <p style={{paddingLeft:'5px'}}>Root Directory:</p>
              <MuiTreeView tree={[this.props.files]} />
            </div>
          </SwipeableDrawer>
        </div>
    );
}
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (SideBar);
