import React from 'react'
import API from '../../../../helpers/API';
import apiconfig from '../../../../configs/api.config.json'
import axios from 'axios';
import { Link } from 'react-router-dom'
// import EditDesignReq from './EditDesignReq';
import CreateDesignReq from './CreateDesignReq';
import { Alert } from 'reactstrap'
// import DeleteDesignReq from './DeleteDesignReq'
import ApprovalDesignReq from './ApprovalDesignReq'

class ListDesignReq extends React.Component {
    constructor(props){
        super(props)
        let role_id = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA)).m_role_id
        this.state = {
            role_id: role_id,
            design: [],
            editData: {},
            currentDesign: {},
            alertData: {
                status: 0,
                message: ''
            },
            colLength: 0,
            visible: false,
            staffList: [],
            insertStatus: false
        }
        this.editModalHandler = this.editModalHandler.bind(this)
        this.modalStatus = this.modalStatus.bind(this)
    }

    getStaffList = async () => {
        let result = await API.getListItem(apiconfig.ENDPOINTS.M_EMPLOYEE + '/staff')
        this.setState({
            staffList: result
        })
    }

    getListDesignReq = async (path) => {
        let result = await API.getListItem(path);
        
        result.map(el => {
            el.isHide = false
        })
        
        this.setState({
            design: result
        })
    }

    searchHandler = (e) => {
        const { design } = this.state
        let searchStr = e.target.value.toLowerCase().trim()
        console.log(searchStr)
        let key = 0
        design.map((el, keys) => {
            key = String(keys + 1)
            const { code, request_by, request_date, assign_to, status, created_by, created_date } = el
            if (
                key.indexOf(searchStr) === -1 &&
                code.toLowerCase().indexOf(searchStr) === -1 &&
                request_by.toLowerCase().indexOf(searchStr) === -1 &&
                request_date.indexOf(searchStr) === -1 &&
                // assign_to.toLowerCase().indexOf(searchStr) === -1 
                status.toLowerCase().indexOf(searchStr) === -1 &&
                created_date.indexOf(searchStr) === -1 &&
                created_by.toLowerCase().indexOf(searchStr) === -1
            ) {
                el.isHide = true
            } else {
                el.isHide = false
            }
        })
        
        this.setState({
            design: design
        })
    }

    incColLength = () => {
        let num = this.state.colLength
        this.setState({
            colLength: num + 1
        })
    }

    getColLength = () => {
        let token = localStorage.getItem(apiconfig.LS.TOKEN);
        let option = {
            url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.COL_LENGTH + '/t_design',
            method: 'get',
            headers: {
                "authorization": token,
                "Content-Type": "application/json"
            }
        }
        axios(option)
        .then((response) => {
            if (response.data.code === 200) {
                this.setState({
                    colLength: response.data.message
                })
            } else {
                alert(response.data.message)
            }
        })
    }

    componentDidMount() {
        this.SPA();
        this.getColLength()
        if (this.state.role_id === "RO0001" || this.state.role_id === "RO0002") {
            this.setState({
                insertStatus: true
            })
        }
    }

    viewModalHandler = designid => {
        let tmp = {}
        this.state.design.map((ele) => {
            if (designid == ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentDesign : tmp,
            viewApprovalReq : true
        })
    }

    editModalHandler(menuid) {
        let tmp = {}, tmp2 = {}
        this.state.menu.map((ele) => {
            if (menuid == ele._id) {
                tmp2 = ele
                tmp = ({
                    _id: ele._id, 
                    code_edit: ele.code, 
                    name_edit: ele.name,
                    controller_edit: ele.controller,
                    parent_id_edit: ele.parent_id
                })
            }
        })
        this.setState({
            editData: tmp2,
            currentDesign : tmp,
            editMenu : true
        })
    }

    SPA = () => {
        let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        let path = `${apiconfig.ENDPOINTS.T_DESIGN}/${userdata.m_role_id}/${userdata.m_employee_id}` 
        this.getListDesignReq(path)
        this.getStaffList()
    }

    closeModalHandler = () => {
        this.setState({
            viewApprovalReq : false,
            editMenu : false,
            deleteMenu : false,
            createReq : false   
        })
    }

    showCreateReq = () => {
        this.setState({
            createReq :true
        })
    }

    modalStatus(status, message) {
        this.setState({
            alertData: {
                status: status,
                message: message,
            },
            visible: true
        })
        setTimeout(() => {
            this.setState({
                visible: false
            })
        }, 5000)
    }

    render(){
        
    return (
        <div>
        <ul class="breadcrumb">
            <li><a href="/">Home</a> <span class="divider">/</span></li>
            <li><a href="/transaction/design">Master</a> <span class="divider">/</span></li>
            <li class="active">List Design Request</li>
        </ul>
       
        <div className="container">
            <h4 style={{marginBottom: '30px'}} >List Design Request</h4>

            {
                this.state.alertData.status === 1 ?
                    <Alert isOpen={this.state.visible} color="success" className="alert-set">
                        {this.state.alertData.message}
                        </Alert>
                    : ''
            }
            {
                this.state.alertData.status === 2 ?
                    <Alert isOpen={this.state.visible} color="danger" className="alert-set">
                        {this.state.alertData.message}
                        </Alert>
                    : ''
            }

                <button type="button" class="btn btn-primary float-right" style={{padding: '6px 40px'}}
                onClick ={this.showCreateReq}
                hidden={this.state.insertStatus}
                disabled={this.state.insertStatus} > Add </button>
                
                <form class="form-inline">
                    <input type="text" className="form-control col-sm-11" placeholder="Cari data" id="text" onChange={this.searchHandler}/>
                </form>

                <CreateDesignReq
                view = {this.state.createReq }
                closeModalHandler={this.closeModalHandler}
                design = {this.state.design}
                colLength = {this.state.colLength}
                incCol = {this.incColLength}
                modalStatus = {this.modalStatus} 
                spaFunc = {this.SPA} 
                />
                <ApprovalDesignReq
                view = {this.state.viewApprovalReq}
                staff = {this.state.staffList}
                closeModalHandler = {this.closeModalHandler} 
                design = {this.state.currentDesign}
                spaFunc = {this.SPA}
                modalStatus = {this.modalStatus} />
                {/* <DeleteMenu
                delete = {this.state.deleteMenu}
                menu = {this.state.currentDesign}
                closeModalHandler = {this.closeModalHandler}
                modalStatus = {this.modalStatus}
                spaFunc = {this.SPA} />
                <EditMenu
                edit = {this.state.editMenu}
                closeModalHandler = {this.closeModalHandler}
                menu = {this.state.currentDesign}
                modalStatus = {this.modalStatus}
                oriMenu = {this.state.editData}
                spaFunc = {this.SPA} /> */}
            </div>

                <div className="container" style={{paddingTop: '40px'}}>
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Transaction Code</th>
                        <th>Request By</th>
                        <th>Request Date</th>
                        <th>Assign To</th>
                        <th>Status</th>
                        <th>Created Date</th>
                        <th>Create By</th>  
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                       {
                            this.state.design.map((ele,x)=> {
                                if (!ele.isHide) {
                                    return <tr>
                                        <td>{x+1}</td>
                                        <td>{ele.code}</td>
                                        <td>{ele.request_by}</td>
                                        <td>{ele.request_date}</td>
                                        <td>
                                            {
                                                this.state.staffList.map((el, key) => {
                                                    if (ele.assign_to === el.employee_id) {
                                                        return el.fullname 
                                                    }
                                                })
                                            }
                                        </td>
                                        <td>{ele.t_status.status}</td>
                                        <td>{ele.created_date}</td>
                                        <td>{ele.employee}</td>
                                        <td>
                                            <Link to='#' className="action-button">
                                            <span onClick = {() => {this.viewModalHandler(ele._id)}} className="fa fa-search" style={{fontSize : '18px', paddingRight : '30px'}} />    
                                            {
                                                this.state.role_id === "RO0003" ? 
                                                    <span onClick = {() => {this.editModalHandler(ele._id)}} class="fa fa-edit" style={{fontSize : '18px', paddingRight : '30px'}} />
                                                : ''
                                            }
                                            </Link>
                                        </td>
                                    </tr>
                                }
                            })
                       }
                    </tbody>
                </table>
                </div>
                </div>
        )
    }
}

export default ListDesignReq