import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class SideBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
          left: false,
        };
    }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const fullList = (
      <div className={classes.fullList}>
        <List>
          {this.props.contents.map((item, index) => (
            <ListItem button key={index}>
              {
                item.extension !== '' ?
                  <ListItemText primary={item.file} />:
                  <>
                  <ListItemText primary={item.file} />
                  <img src="./downArrow.svg" alt="downArrow" />
                  </>
              }
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
        <div>
        <Button onClick={this.toggleDrawer('left', true)} variant="contained" color="secondary" className={classes.button}>
            Root
        </Button>
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
                    {fullList}
                </div>
            </SwipeableDrawer>
        </div>
    );
}
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideBar);
