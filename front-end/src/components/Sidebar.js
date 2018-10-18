import React from 'react';
import axios from 'axios';
import apiconfig from '../configs/api.config';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: []
        }
    }

    getListMenu = () => {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let userData = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        let option = {
            url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.M_MENU + '-agr',
            method: "POST",
            headers: {
                "authorization": token,
                "Content-Type": 'application/json'
            },
            data: {
                user_role: userData.m_role_id
            }
        }
        axios(option)
        .then(response => {
            if (response.data.code === 200) {
                this.setState({
                    menu: response.data.message
                })
            } else {
                alert(response.data.message)
            }
        })
        .catch(error => {
            return error.response.data
        })
    }

    componentDidMount() {
        this.getListMenu();
    }

    render() {
        return (
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>Master</span>
                        {/* <a className="d-flex align-items-center text-muted" href="#"></a> */}
                    </h5>

                    <ul className="nav flex-column mb-2" >
                        {
                            this.state.menu.map(el => {
                                if (el.parent_id === 'master') {
                                    return <li className="nav-item">
                                        <a className="nav-link" href={ el.controller } > { el.menu_name } </a>
                                    </li>
                                }
                            })
                        }
                    </ul>

                    <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>Transaction</span>
                        {/* <a className="d-flex align-items-center text-muted" href="#"></a> */}
                    </h5>

                    <ul className="nav flex-column mb-2">
                    {
                            this.state.menu.map(el => {
                                if (el.parent_id === 'transaction') {
                                    return <li className="nav-item">
                                        <a className="nav-link" href={ el.controller } > { el.menu_name } </a>
                                    </li>
                                }
                            })
                        }

                    </ul>
                </div>
            </nav>
        )
    }

}

export default Sidebar
