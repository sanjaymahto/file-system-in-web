import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Explorer from '../Explorer/index';
import SideBar from '../Sidebar/index';
import * as actions from './actions';
import { ROOT } from './constants';
import { getNodeInfo ,getRootFileInfo ,updateFileSystem} from '../../utils'
import './index.scss';




class Home extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            fileSystem : null,
            currentNode : null,
            fetchFiles : false
        };
    }

    static getDerivedStateFromProps(props, state){
        if(!(state.fileSystem && state.currentNode)){
            return { fetchFiles : true }
        }
        else{
            return {
                fileSystem : props.fileSystem,
                currentNode : props.currentNode,
                fetchFiles : false
            }
        }
    }

    getRootFiles(){
        const root = getRootFileInfo();
        getNodeInfo(root,'').then(res=>{
            console.log(res)
            this.setState({
                currentNode : res,
                fileSystem: { ...root, ...res},
                fetchFiles: false
            },() => {
                this.props.setFileSystem(updateFileSystem(null,res));    
            })
            
        });
        
    }

    render() {
        if(this.state.fetchFiles){
            //show-loader
            this.getRootFiles();
            return (<></>)
        }
        else {
            return (
                <>
                    <SideBar fileSystem = {this.state.fileSystem}/>
                    <Explorer currentNode = {this.state.currentNode}/>
                </>
            )
        }
    }
}

    Home.propTypes = {
    fileSystem: PropTypes.object.isRequired
    };

    const mapStateToProps = (state) => {
    state = state.contentReducer.toJS();
    return {
        fileSystem: state.fileSystem
    };
    };

    const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        ...actions
    }, dispatch);
    };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
