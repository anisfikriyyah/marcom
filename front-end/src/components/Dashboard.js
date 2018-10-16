import React, { Component } from 'react'
//import { Switch, Route } from 'react-router-dom'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
//import Login from './Login'
import DashboardSwitcher from './DashboardSwitcher'

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <Sidebar />
                        <DashboardSwitcher />
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;