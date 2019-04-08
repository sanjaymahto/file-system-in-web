import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import FileIcon, { defaultStyles } from 'react-file-icon';

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

class ContentInfoModal extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            open: true
        }
    }


  /**
   * function to close modal
   * 
   */
  handleClose = () => {
    this.setState({ open: false });
    this.props.closeModal();
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}>
          <div style={getModalStyle()} className={classes.paper}>
              <Typography  className="modal_heading">
                {this.props.currentNode.isFolder ? `Folder Info:`:
                `File Info:`}
              </Typography>
            {this.props.currentNode.type ?
              <FileIcon size={60} extension={this.props.currentNode.type} {...defaultStyles} />:
              <img  src="https://img.icons8.com/nolan/64/000000/opened-folder.png" alt="Folder"/>
            }
            <Typography  className="modal_heading">
              Name: {this.props.currentNode.value}
            </Typography>
            <Typography  className="modal_heading">
              Size: {`${this.props.currentNode.size} Kb`}
            </Typography>
            <Typography  className="modal_heading">
              Created Date: {(this.props.currentNode.date).toLocaleString()}
            </Typography>
          </div>
        </Modal>
      </div>
    );
  }
}

ContentInfoModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(ContentInfoModal);

export default SimpleModalWrapped;
