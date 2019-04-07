import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as actions from './action';
import './index.scss'

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
        width: '100%',
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
            type: '',
            open: true,
            name:'',
            creator:'',
            size:'',
            date: (new Date()).toLocaleDateString()
        }
    }

    handleClose = () => {
        this.props.closeModal();
        this.setState({ open: false });
    };

    onChange = (event) =>{
            this.setState({
                type: event
            });
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    createFileOrFolder(){
        if(!this.state.name && !this.state.type){
            this.handleClose()
        } else {
        if(this.state.type === 'file'){
            this.props.createFile(this.props.currentNode, this.state.name);
        } else {
            this.props.createFolder(this.props.currentNode, this.state.name);
        }
        this.props.updateDirectory(this.props.fileSystem,this.props.currentNode);
        this.handleClose()
    }
}

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
                <Typography className="modal_heading">
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
                <TextField type='number' id="standard-name" label="Size" className={classes.textField}
                    value={this.state.size}
                    onChange={this.handleChange('size')}
                    margin="normal"/>
                <TextField id="standard-name" label="Date" className={classes.textField}
                    value={this.state.date}
                    disabled
                    margin="normal"/>
                <Button variant="contained" color="primary" className={classes.button} onClick={this.createFileOrFolder.bind(this)}>
                    Create
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


    const mapDispatchToProps = dispatch => {
        return bindActionCreators({
            ...actions
        }, dispatch);
        };
    
export default connect(null, mapDispatchToProps)(withStyles(styles)(InfoModal));
    
