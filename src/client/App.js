import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Login from './components/login/login';
import './public/sass/style.scss';

const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
            </Switch>
        </div>
    );
};

export default App;
