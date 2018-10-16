import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import apiconfig from '../configs/api.config.json';

const Main = () => {
    return (
        <main>
            <Switch>
                <Route exact path='/' render={() => (
                    localStorage.getItem(apiconfig.LS.TOKEN) == null ? (
                        <Route exact path='/' component = { Login } />
                    ) : (
                        <Redirect to='/dashboard' />
                    )
                )} />

                <Dashboard />
            </Switch>
        </main>
    )
}

export default Main