import React from 'react'
import API from '../../../helpers/API';
import apiconfig from '../../../configs/api.config.json'
import axios from 'axios';
import { Link } from 'react-router-dom'
import EditMenu from './EditMenu';
import CreateMenu from './CreateMenu';
import { Alert } from 'reactstrap'
import DeleteMenu from './DeleteMenu'
import ViewMenu from './ViewMenu'

class ListMenu extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            menu: [],
            editData: {},
            editMenu: false,
            currentMenu: {},
            alertData: {
                status: 0,
                message: ''
            },
            colLength: 0,
            visible: false
        }
        this.deleteHandler=this.deleteHandler.bind(this)
        this.deleteModalHandler = this.deleteModalHandler.bind(this)
        this.viewModalHandler = this.viewModalHandler.bind(this)
        this.editModalHandler = this.editModalHandler.bind(this)
        this.modalStatus = this.modalStatus.bind(this)
    }

    async getListMenu(path) {
        let result = await API.getListItem(path);
        result.map(el => {
            el.isHide = false
        })
        
        this.setState({
            menu: result
        })
    }

    autoGenerateRois = () => {
        // YY.MM.DD.NN
        const { employee } = this.state
        const date = new Date()
        let YY = date.getFullYear().slice(2)
        let MM = date.getMonth() + 1
        if (MM < 10) {
            MM = '0' + MM
        }
        let DD = date.getDate()
        let prior = `${YY}.${MM}.${DD}.`
        let emp_id = employee.employee_number

        let count = emp_id.map(ele => {
            if (employee.employee_number.indexOf(prior) > -1) {
                return 1
            }
        })

        if (count.length > 0) {
            if (count.length < 10) {
                return prior+'0'+count.length
            } else {
                return prior + count.length
            }
        } else {
            return prior + '01'
        }

    }

    searchHandler = (e) => {
        const { menu } = this.state
        let searchStr = e.target.value.toLowerCase().trim()
        let key = 0
        menu.map((el, keys) => {
            key = String(keys + 1)
            const { code, name, created_by, created_date } = el
           
            if (
                key.indexOf(searchStr) === -1 &&
                code.toLowerCase().indexOf(searchStr) === -1 &&
                name.toLowerCase().indexOf(searchStr) === -1 &&
                created_date.indexOf(searchStr) === -1 &&
                created_by.toLowerCase().indexOf(searchStr) === -1
            ) {
                el.isHide = true
            } else {
                el.isHide = false
            }
        })
        
        this.setState({
            menu: menu
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
            url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.COL_LENGTH + '/m_menu',
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
    }

    deleteModalHandler(menuid) {
        let tmp = {}
        this.state.menu.map((ele) => {
            if (menuid === ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentMenu : tmp,
            deleteMenu : true
        })
    }

    viewModalHandler(menuid) {
        let tmp = {}
        this.state.menu.map((ele) => {
            if (menuid == ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentMenu : tmp,
            viewMenu : true
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
            currentMenu : tmp,
            editMenu : true
        })
    }

    SPA = () => {
        this.getListMenu(apiconfig.ENDPOINTS.M_MENU)
    }

    closeModalHandler = () => {
        this.setState({
            viewMenu : false,
            editMenu : false,
            deleteMenu : false,
            createMenu : false   
        })
    }

    showHandler = () => {
        this.setState({createMenu :true})
    }

    deleteHandler(param){
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.AGAMA+'/'+param,
            method: "delete",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response)=>{
            let currentindex = -1
            this.state.agama.map((ele, idx)=>{
                if(ele._id==param){
                    currentindex=idx
                    this.props.history.goBack()
                }
            })
            let tmp=this.state.agama
            tmp.splice(currentindex,1)
            this.setState({
                agama: tmp
            })
        })
        .catch((error)=>{
            console.log(error)
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
            <li><a href="/menu">Master</a> <span class="divider">/</span></li>
            <li class="active">List Menu</li>
        </ul>
       
        <div className="container">
            <h4 style={{marginBottom: '30px'}} >List Menu</h4>

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
                onClick ={this.showHandler}> Add </button>
                
                <form class="form-inline">
                    <input type="text" className="form-control col-sm-11" placeholder="Cari data" id="text" onChange={this.searchHandler}/>
                </form>

                <CreateMenu
                show = {this.state.createMenu }
                closeModalHandler={this.closeModalHandler}
                colLength = {this.state.colLength}
                incCol = {this.incColLength}
                modalStatus = {this.modalStatus} 
                spaFunc = {this.SPA} />
                <ViewMenu
                view = {this.state.viewMenu}
                closeModalHandler = {this.closeModalHandler} 
                menu = {this.state.currentMenu} />
                <DeleteMenu
                delete = {this.state.deleteMenu}
                menu = {this.state.currentMenu}
                closeModalHandler = {this.closeModalHandler}
                modalStatus = {this.modalStatus}
                spaFunc = {this.SPA} />
                <EditMenu
                edit = {this.state.editMenu}
                closeModalHandler = {this.closeModalHandler}
                menu = {this.state.currentMenu}
                modalStatus = {this.modalStatus}
                oriMenu = {this.state.editData}
                spaFunc = {this.SPA} />
            </div>

                <div className="container" style={{paddingTop: '40px'}}>
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Code</th>
                        <th>Menu Name</th>
                        <th>Created Date</th>
                        <th>Create By</th>  
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                       {
                            this.state.menu.map((ele,x)=> {
                                if (!ele.isHide) {
                                    return <tr>
                                        <td>{x+1}</td>
                                        <td>{ele.code}</td>
                                        <td>{ele.name}</td>
                                        <td>{ele.created_date}</td>
                                        <td>{ele.created_by}</td>
                                        <td>
                                            <Link to='#' className="action-button">
                                            <span onClick = {() => {this.viewModalHandler(ele._id)}} className="fa fa-search" style={{fontSize : '18px', paddingRight : '30px'}} />    
                                            <span onClick = {() => {this.editModalHandler(ele._id)}} class="fa fa-edit" style={{fontSize : '18px', paddingRight : '30px'}} />            
                                            <span onClick = {() => {this.deleteModalHandler(ele._id)}} class="fa fa-trash" style={{fontSize : '18px'}} />
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

export default ListMenu