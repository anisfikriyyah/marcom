import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import apiconfig from './../../../../configs/api.config.json'
import axios from 'axios'
import API from '../../../../helpers/API'
import formValidation from '../../../../helpers/validation_form'
// import DeleteModal from './DeleteModal'
// import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';


export default class CreateDesignReq extends React.Component {
    constructor(props){
        super(props)
        let date = new Date()
        let hari = date.getDate()
        let bulan = date.getMonth() + 1
        let tahun = date.getFullYear()
        if (bulan < 10) {
            bulan = '0' + bulan
        }
        let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        let role_id = userdata.m_role_id
        this.state = {
            user_id: userdata._id,
            role_id: role_id,
            startDate: '',
            disableStatus: false,
            design_item: [],
            event: [],
            product: [],
            employee: '',
            formdata_design: {
                code: '',
                t_event_id: '',
                title_header: '',
                request_by: '',
                request_date: hari + '/' + bulan + '/' + tahun,
                note: '',
                status: 1,
                created_by: userdata._id
            },
            formdata_item: [
                {  
                    description: '',
                    t_design_id: '',
                    m_product_id: '',
                    title_item: '',
                    request_pic: '',
                    request_due_date: moment(),
                    note: '',
                    created_by: userdata._id
                }
            ]
        }
    }

    handleChangeDate = date => {
        this.setState({
            startDate: date
        });
    }

    changeDesignHandler = (e) => {
        let tmp = this.state.formdata_design
        tmp[e.target.name] = e.target.value
        this.setState({
            formdata_design: tmp
        })
    }

    changeItemHandler = (e) => {
        let event = e.target
        let { formdata_item } = this.state
        let selectedIndex = 0
        let index = event.getAttribute('data-key')
        if (event.name === 'm_product_id') {
            selectedIndex = event.options.selectedIndex
            formdata_item[index].description = event.options[selectedIndex].getAttribute('produk')
        }
        
        formdata_item[index][event.name] = event.value
        this.setState({
            formdata_item: formdata_item
        })
    }

    deleteRowHandler = (key) => {
        let tmp = this.state.formdata_item
        if (tmp.length < 2) {
            alert("Request design harus ada produk minimal satu")
        } else {
            tmp.splice(key, 1)
            this.setState({
                formdata_item: tmp
            })
        }
    }

    addNewItem = () => {
        let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        let newItem = {
            t_design_id: '',
            m_product_id: '',
            title_item: '',
            request_pic: '',
            request_due_date: '',
            note: '',
            created_by: userdata._id
        }
        this.setState(prevState => ({
            formdata_item: [...prevState.formdata_item, newItem]
        }))
    }
    
    toggleModal = () => {
        this.setState({
            deleteModal: !this.state.deleteModal
        })
    }

    getListEvent = async () => {
        let result = await API.getListItem(apiconfig.ENDPOINTS.T_EVENT)
        this.setState({
            event: result
        })
    }

    getListProduct = async () => {
        let result = await API.getListItem(apiconfig.ENDPOINTS.M_PRODUCT)
        this.setState({
            product: result
        })
    }

    getEmployee = () => {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.M_EMPLOYEE+'/'+userdata.m_employee_id,
            method: "get",
            headers:{
                "authorization": token,
            },
        }
        axios(option)
        .then((response)=>{
            if(response.data.code === 200){
            let tmp = this.state.formdata_design
            tmp.request_by = response.data.message
            this.setState({
                formdata_design: tmp
            })    
            }
        })
        .catch((error)=>{
            console.log(error);            
        })
    }

    generateCode(res, cb) {
        let prior = 'TRWODS'
        let date = new Date()
        let hari = date.getDate()
        let bulan = date.getMonth()+1
        if (bulan < 10) {
            bulan = '0' + bulan
        }
        let tahun = String(date.getFullYear()).slice(2)
        prior = prior+hari+bulan+tahun
        res++
        if (res < 10) {
            return cb(`${prior}0000${res}`)
        } else if (res < 100) {
            return cb(`${prior}000${res}`)
        } else if (res < 1000) {
            return cb(`${prior}00${res}`)
        } else if (res < 10000) {
            return cb(`${prior}0${res}`)
        } else {
            return cb(`${prior}${res}`)
        }
    }

    componentWillReceiveProps(data) {
        this.getListEvent()
        this.getListProduct()
        this.getEmployee()
        this.generateCode(data.colLength, result => {
            let tmp = this.state.formdata_design
            tmp.code = result
            tmp.title_header = ''
            tmp.t_event_id = ''
            tmp.note = ''
            let formdata_item = [
                {  
                    description: '',
                    t_design_id: '',
                    m_product_id: '',
                    title_item: '',
                    request_pic: '',
                    request_due_date: '',
                    note: '',
                    created_by: this.state.user_id
                }
            ]
            this.setState({
                formdata_design: tmp,
                formdata_item: formdata_item
            })
        })
    }

    submitHandler = () => {
        let { formdata_design, formdata_item } = this.state
        formValidation.createReqDesign(formdata_design, formdata_item, (status, message, design, item) => {
            if (!status) {
                alert(message)
            } else {
                
                console.log(design)
                console.log(item)
                
                let token = localStorage.getItem(apiconfig.LS.TOKEN)
                this.setState({ disableStatus: true })
                let option = {
                    url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.T_DESIGN,
                    method: "post",
                    headers:{
                        "authorization": token,
                        "Content-Type" : "application/json"
                    },
                    data: {
                        design: this.state.formdata_design,
                        design_item: this.state.formdata_item
                    }
                }
                axios(option)
                .then((response)=>{
                    let sucMessage = <span><b>Data Saved! </b>Transaction design request has been add with code <b>{this.state.formdata_design.code} !</b></span>
                    let errMessage = <span>Data <b> failed </b> to insert, please try again</span>
                    if(response.data.code === 200){
                        this.props.incCol()
                        this.props.closeModalHandler()
                        this.props.spaFunc()
                        this.props.modalStatus(1, sucMessage)
                    } else {
                        this.props.modalStatus(2, errMessage)
                        this.props.closeModalHandler()
                    }
                })
                .catch((error)=>{
                    console.log(error);            
                })
                this.setState({ disableStatus: false })
            }
        })
    }

    render(){
        let { formdata_item } = this.state
        return(
            <Modal isOpen={this.props.view} className={this.props.className} size="lg">
                <ModalHeader className="bg-primary"> Add Design Request </ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <table>
                                    <tr>
                                        <td>Transaction Code *</td>
                                        <td style={{padding: '0 30px 0 15px'}}>:</td>
                                        <td>
                                            <div class ="input-group input-group-sm">
                                                <input type="text" name="code" class="form-control" value={this.state.formdata_design.code} disabled />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Event Code *</td>
                                        <td style={{padding: '0 30px 0 15px'}}>:</td>
                                        <td>
                                            <select name="t_event_id" onChange = {this.changeDesignHandler} className="form-control" style={{fontSize: '.875rem'}} >
                                                <option disabled selected> - Select Event </option>
                                                {
                                                    this.state.event.map((el, keys) => {
                                                        return <option value = { el._id }> { el.code } </option>
                                                    })
                                                }   
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Design Title *</td>
                                        <td style={{padding: '0 30px 0 15px'}}>:</td>
                                        <td>
                                            <div class ="input-group input-group-sm">
                                                <input type="text" name="title_header" class="form-control" value={this.state.formdata_design.title_header} onChange={this.changeDesignHandler} />
                                            </div>
                                        </td>
                                    </tr>
                                </table>                        
                            </div>
                            <div className="col-sm-6">
                                <table>
                                    <tr>
                                        <td>Request By *</td>
                                        <td style={{padding: '0 30px 0 15px'}}>:</td>
                                        <td>
                                            <div class ="input-group input-group-sm">
                                                <input type="text" name="request_by" class="form-control" value={this.state.formdata_design.request_by} disabled />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Request Date *</td>
                                        <td style={{padding: '0 30px 0 15px'}}>:</td>
                                        <td>
                                            <div class ="input-group input-group-sm">
                                                <input type="text" name="request_date" class="form-control" value={this.state.formdata_design.request_date} disabled />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Note</td>
                                        <td style={{padding: '0 30px 0 15px'}}>:</td>
                                        <td>
                                            <div class ="input-group input-group-sm">
                                                <textarea type="textarea" rows="4" name="note" class="form-control" value={this.state.formdata_design.note} onChange={this.changeDesignHandler} />
                                            </div>
                                        </td>
                                    </tr>
                                </table>    
                            </div>
                        </div>
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <button 
                            type="button" 
                            class="btn btn-primary" 
                            style={{padding: '6px 30px'}}
                            onClick ={this.addNewItem}> Add Item </button>
                    </div>
                    <table style={{marginTop: '20px'}}>
                        <tr className="design-req">
                            <th>Product Name</th>
                            <th>Product Description</th>
                            <th>Title</th>
                            <th>Request PIC</th>
                            <th>Due Date</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Note</th>
                            <th></th>
                        </tr>
                        {
                            formdata_item.map((ele, key) => {
                                return <tr className='design-req-list'>
                                    <td>
                                        <select data-key = {key} style={{height: '52px'}} name="m_product_id" onChange = {this.changeItemHandler} className="form-control" >
                                            <option value=""> - Select Product </option>
                                            {
                                                this.state.product.map((el, keys) => {
                                                    if (el._id === ele.m_product_id) {
                                                        return <option produk={el.description} value = { el._id } selected > { el.name } </option>
                                                    } else {
                                                        return <option produk={el.description} value = { el._id }> { el.name } </option>
                                                    }
                                                })
                                            }   
                                        </select>
                                    </td>
                                    <td>
                                        <div class ="input-group input-group-sm">
                                            <input data-key={key} type="text" name="description" value={ele.description || ''} class="form-control" disabled />
                                        </div>
                                    </td>
                                    <td>
                                        <div class ="input-group input-group-sm">
                                            <input data-key = {key} type="text" name="title_item" value={ele.title_item} class="form-control" onChange={this.changeItemHandler} />
                                        </div>
                                    </td>
                                    <td>
                                        <div class ="input-group input-group-sm">
                                            <input data-key={key} type="text" name="request_pic" class="form-control" value={ele.request_pic} onChange={this.changeItemHandler} />
                                        </div>
                                    </td>
                                    <td>
                                        <div class ="input-group input-group-sm">
                                            <input data-key={key} type="date" name="request_due_date" class="form-control" value={ele.request_due_date} onChange={this.changeItemHandler} />
                                        </div>
                                    </td>
                                    <td>
                                        <div class ="input-group input-group-sm">
                                            <DatePicker
                                                dateFormat = "DD/MM/YYYY"
                                                selected={this.state.startDate}
                                                onChange={this.handleChangeDate}
                                                className="form-control"
                                                disabled={true} />
                                        </div>
                                    </td>
                                    <td>
                                        <div class ="input-group input-group-sm">
                                            <DatePicker
                                                dateFormat = "DD/MM/YYYY"
                                                selected={this.state.startDate}
                                                onChange={this.handleChangeDate}
                                                className="form-control"
                                                disabled={true} />
                                        </div>
                                    </td>
                                    <td>
                                        <div class ="input-group input-group-sm">
                                            <textarea data-key={key} name="note" class="form-control" value={ele.note} onChange={this.changeItemHandler} />
                                        </div>
                                    </td>
                                    <td>
                                        {/* <Link to='#' className="action-button"> */}
                                            {/* <span onClick = {() => {this.editModalHandler(ele._id)}} class="fa fa-edit" style={{fontSize : '18px', paddingRight : '30px'}} />             */}
                                            <div className="action-button">
                                                <span onClick = {() => {this.deleteRowHandler(key)}} class="fa fa-trash" style={{fontSize : '25px', cursor: 'pointer', color: '#007bff'}} />           
                                            </div>
                                        {/* </Link> */}
                                    </td>
                                </tr>
                            })
                        }
                    </table>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" disabled={this.state.disableStatus} onClick = {this.submitHandler}>Save</Button>
                    <Button color="warning" disabled={this.state.disableStatus} onClick = {this.props.closeModalHandler}>Cancel</Button>
                </ModalFooter>
                {/* <SetActionButton 
                status = {this.props.design.status}
                approvedHandler = {this.approvedHandler}
                closeModalHandler = {this.props.closeModalHandler}
                deleteModal = {this.state.deleteModal}
                toggleModal = {this.toggleModal} 
                reject_reason = {this.state.formdata.reject_reason}
                rejectHandler = {this.rejectHandler}
                rejectChangeHandler = {this.rejectChangeHandler} /> */}
            </Modal>
        )
    }
}

class SetActionButton extends React.Component {
    render() {
        if (this.props.status === 'Submitted' && this.state.role_id === 'RO0001') {
            return (
                <ModalFooter>    
                    <Button color="primary" onClick = {this.props.approvedHandler}>Approved</Button>
                    <Button color="danger" onClick = {this.props.toggleModal}>Reject</Button>
                    <Button color="warning" onClick = {this.props.closeModalHandler}>Cancel</Button>
                    {/* <DeleteModal 
                        reject = {this.props.deleteModal}
                        reject_reason = {this.props.reject_reason}
                        rejectChangeHandler = {this.props.rejectChangeHandler}
                        rejectHandler = {this.props.rejectHandler}
                        close = {this.props.toggleModal} /> */}
                </ModalFooter>
            )
        } else if (this.state.role_id === "RO0001") {
            return (
                <ModalFooter>    
                    <Button color="warning" onClick = {this.props.closeModalHandler}>Close</Button>
                </ModalFooter>
            )
        }
    }
}