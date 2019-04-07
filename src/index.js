import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route ,Switch} from 'react-router-dom'
import configureStore from './store';
import Home from './Components/Home/index';
import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(
    <Provider store={configureStore()}>
    <Router>
        <div>
        <Switch>
            <Route exact path="/" component={Home}/>
        </Switch>
        </div>
    </Router>
    </Provider>,
document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
