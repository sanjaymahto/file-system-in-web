import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Explorer from '../Explorer/index';
import Navbar from '../Navbar/index';
import * as actions from './actions';
import './index.scss';
import { ROOT } from '../../utils/constants';



class Home extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            fileSystem : props.fileSystem,
            currentNode : props.currentNode,
            fetchFiles : props.fetchFiles,
        };
    }

    static getDerivedStateFromProps(props, state){
        if(!state.currentNode && props.fileSystem.value === ROOT){
            return { currentNode : props.fileSystem}
        }
        return null;
    }

    getFiles(){
        this.props.fetchInfoAndUpDateFileSytem(this.state.fileSystem,this.state.currentNode)
    }

    updateCurrentNode(node){
        this.props.fetchInfoAndUpDateFileSytem(this.state.fileSystem,node)
    }

    render() {
        if(this.props.fetchFiles){
            this.getFiles();
            return (<></>)
        }
        else {
            return (
                <>
                    <Navbar fileSystem = {this.props.fileSystem}
                            currentNode = {this.props.currentNode} />
                    <Explorer currentNode = {this.props.currentNode} updateCurrentNode={this.updateCurrentNode.bind(this)}/>
                </>
            )
        }
    }
}

    Home.propTypes = {
    fileSystem: PropTypes.object.isRequired,
    currentNode: PropTypes.object.isRequired
    };

    const mapStateToProps = (state) => {
    state = state.contentReducer.toJS();
    return {
        fileSystem: state.fileSystem,
        currentNode: state.currentNode,
        fetchFiles:state.fetchFiles
    };
    };

    const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        ...actions
    }, dispatch);
    };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
