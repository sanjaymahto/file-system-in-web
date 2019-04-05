import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    }
});

class InfoModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            name:'',
            creator:'',
            size:'',
            date: new Date()
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onChange = (event) =>{
            console.log(event);
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
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
                <Typography>
                    Create New: 
                </Typography>
            <RadioGroup onChange={(event)=>this.onChange(event)} horizontal>
                <RadioButton value="file">
                    File
                </RadioButton>
                <RadioButton value="folder">
                    Folder
                </RadioButton>
            </RadioGroup>
            <form className={classes.container} noValidate autoComplete="off">
                <TextField id="standard-name" label="Name" className={classes.textField} 
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"/>
                <TextField id="standard-name" label="Creator" className={classes.textField}
                value={this.state.creator}
                onChange={this.handleChange('creator')}
                margin="normal"/>
                <TextField id="standard-name" label="Size" className={classes.textField}
                value={this.state.size}
                onChange={this.handleChange('size')}
                margin="normal"/>
                <TextField id="standard-name" label="Date" className={classes.textField}
                value={this.state.date}
                disabled
                margin="normal"/>
                <Button variant="contained" color="primary" className={classes.button}>
                    Primary
                </Button>
            </form>
            </div>
            </Modal>
        </div>
        );
    }
    }

    InfoModal.propTypes = {
    classes: PropTypes.object.isRequired,
    };

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(InfoModal);

export default SimpleModalWrapped;
