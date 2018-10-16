import React from 'react';
import axios from 'axios';
import apiconfig from '../configs/api.config';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collections: []
        }
        this.getColl = this.getColl.bind(this)
    }
    getColl() {
        let token=localStorage.getItem(apiconfig.LS.TOKEN)
        let option={
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.collectionList,
            method: "GET",
            headers: {
                "authorization": token
            }
        }
        axios(option)
        .then(response => {
            this.setState({
                collections: response.data.message
            })
        })
        .catch(error => {
            return error.response.data
        })
    }

    // componentDidMount() {
    //     this.getColl();
    // }

    render() {
        return (
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>Main Menu</span>
                        {/* <a className="d-flex align-items-center text-muted" href="#"></a> */}
                    </h5>

                    <ul className="nav flex-column mb-2" >
                        {
                            this.state.collections.map(el =>
                                <li className="nav-item">
                                    <a className="nav-link" href={ el.path } > { el.nama_menu } </a>
                                </li>
                            )
                        }
                    </ul>

                    <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>Transaction</span>
                        {/* <a className="d-flex align-items-center text-muted" href="#"></a> */}
                    </h5>

                    <ul className="nav flex-column mb-2">
                        <li className="nav-item">
                            <a className="nav-link" href="#"> Transaction event Request </a>
                        </li>

                    </ul>
                </div>
            </nav>
        )
    }

}

export default Sidebar
