import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Item, Separator } from 'react-contexify';
import ContentInfoModal from '../ContentInfoModal/index';
import { searchNode } from '../../utils/index';
import './index.scss'

class  ContextMenu extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            content: '',
            currentNode: ''
        }

    }


    componentDidUpdate(){
        if(this.props.deleteFlag) {
            this.props.updateDirectory(this.props.fileSystem,this.props.currentNode)
            this.props.resetDeleteFlag();
        }
    }

    openDirectoryEvent(event){
        let content;
        if(event.event.target.innerText) {
            let textArray = event.event.target.innerText.split('\n');
            if(textArray.length > 1){
                content = event.event.target.innerText.split('\n')[1];
                this.setState({
                    showModal: true,
                    content,
                    currentNode:searchNode(this.props.currentNode, `${this.props.currentNode.path}/${content}`)
                })
            } else {
                content = event.event.target.innerText.split('\n')[0];
                this.props.enterIntoDirectory(searchNode(this.props.currentNode,`${this.props.currentNode.path}/${content}`));
            }
        } else{
            alert('Oops!! Clicked on Image...')
        }
    }

    getInfoModalEvent(event){
        let content;
        if(event.event.target.innerText) {
            let textArray = event.event.target.innerText.split('\n');
            if(textArray.length > 1){
                content = event.event.target.innerText.split('\n')[1];
            } else {
                content = event.event.target.innerText.split('\n')[0]
            }
            this.setState({
                showModal: true,
                content,
                currentNode:searchNode(this.props.currentNode, `${this.props.currentNode.path}/${content}`)
            })
        } else{
            alert('Oops!! clicked on Image...')
        }
    }

    deleteEvent(event){
        let content;
        if(event.event.target.innerText) {
            let textArray = event.event.target.innerText.split('\n');
            if(textArray.length > 1){
                content = event.event.target.innerText.split('\n')[1];
                this.props.deleteFile(this.props.currentNode, content);
            } else {
                content = event.event.target.innerText.split('\n')[0]
                this.props.deleteFolder(this.props.currentNode, content);
            }
        } else{
            alert('Oops!! clicked on Image...')
        }
    }

    closeModal = () => {
        this.setState({
            showModal: false
        })
    }

    render() {
        return (
            <div>
            <Menu id='menu_id'>
                <Item onClick={this.openDirectoryEvent.bind(this)} >Open</Item>
                    <Separator />
                <Item  onClick={this.getInfoModalEvent.bind(this)}>Get Info</Item>
                    <Separator />
                <Item onClick={this.deleteEvent.bind(this)}>Delete</Item>
            </Menu>
            {this.state.showModal?
            <ContentInfoModal
            currentNode={this.state.currentNode}
            name={this.state.content}
            closeModal={this.closeModal}
            />:
            null}
            </div>);
    }
}

ContextMenu.propTypes = {
    deleteFlag: PropTypes.bool,
};

const mapStateToProps = (state) => {
    state = state.contentReducer.toJS();
    return {
        deleteFlag: state.deleteFlag
    };
    }; 

export default connect(mapStateToProps, null)(ContextMenu);


