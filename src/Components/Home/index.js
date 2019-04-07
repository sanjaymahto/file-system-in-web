import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'
import Explorer from '../Explorer/index';
import Navbar from '../Navbar/index';
import * as actions from './actions';
import './index.scss';
import { ROOT } from '../../reducers/constants';



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

    /**
     * function to get initial files from server
     * 
     */
    getFiles(){
        this.props.fetchInfoAndUpDateFileSytem(this.state.fileSystem,this.state.currentNode)
    }

    /**
     * Funtion to update the current node (i.e the directory in the explorer field)
     * 
     * @param  {Object} node - Current Node
     */
    updateCurrentNode(node){
        this.props.fetchInfoAndUpDateFileSytem(this.props.fileSystem,node)
    }

    render() {
        if(this.props.fetchFiles){
            this.getFiles();
            return (
                <div className="explorer_loader">
                    <Loader className="explorer_loader__barloader" type="Bars" color="#000" height={50} width={80} />
                </div>)
        }
        else {
            return (
                <>
                    <Navbar fileSystem = {this.props.fileSystem}
                            currentNode = {this.props.currentNode}
                            updateCurrentNode={this.updateCurrentNode.bind(this)}
                            updateSearchNode={this.props.updateSearchFileSystem}
                            />
                    <Explorer currentNode = {this.props.currentNode}
                    fileSystem = {this.props.fileSystem} 
                    updateCurrentNode={this.updateCurrentNode.bind(this)}
                    updateDirectory={this.props.updateDirectory}
                    />
                </>
            )
        }
    }
}

    Home.propTypes = {
    fileSystem: PropTypes.object,
    currentNode: PropTypes.object
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
