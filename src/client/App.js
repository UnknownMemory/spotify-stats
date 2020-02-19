import React, {Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Login from './components/login/login';
import './public/sass/style.scss';

const App = () => {
    return (
        <Fragment>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
            </Switch>
        </Fragment>
    );
};

export default App;
