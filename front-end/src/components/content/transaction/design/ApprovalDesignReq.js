import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import apiconfig from './../../../../configs/api.config.json'
import axios from 'axios'
import API from '../../../../helpers/API'
import RejectModal from './RejectModal'

export default class ViewMenu extends React.Component {
    constructor(props){
        super(props)
        let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        let role_id = userdata.m_role_id
        this.state = {
            role_id: role_id,
            design_item: [],
            staff: [],
            formdata: {
                assign_to: '',
                status: '',
                reject_reason: '',
                updated_by: userdata.username
            },
            rejectModal: false,
            headerMessage: ''
        }
    }

    setAssignTo = (e) => {
        let tmp = this.state.formdata
        tmp[e.target.name] = e.target.value
        this.setState({ formdata : tmp})
    }
    
    approvedHandler = () => {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        if (this.state.formdata.assign_to === "") {
            alert("Isi data staff terlebih dahulu")
        } else {
            let option = {
                url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.T_DESIGN,
                method: "PUT",
                headers: {
                    "authorization": token,
                    "Content-Type": "application/json"
                },
                data: {
                    status: 2,
                    reject_reason: '',
                    assign_to: this.state.formdata.assign_to,
                    code: this.props.design.code,
                    updated_by: this.state.formdata.updated_by
                }
            }
            axios(option)
            .then(response => {
                let sucMessage = <span><b>Data Approved! </b>Transaction design request with code <b>{this.props.design.code}</b> has been approved !</span>
                if (response.data.code == 200) {
                    this.props.closeModalHandler()
                    this.props.spaFunc()
                    this.props.modalStatus(1, sucMessage)
                } else {
                    this.props.closeModalHandler()
                }
            })
            .catch(error => {
                return error.response.data
            })
        }
    }

    rejectChangeHandler = (e) => {
        let tmp = this.state.formdata
        tmp.reject_reason = e.target.value
        this.setState({
            formdata : tmp
        })
    }

    rejectHandler = () => {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.T_DESIGN,
            method: "PUT",
            headers: {
                "authorization": token,
                "Content-Type": "application/json"
            },
            data: {
                status: 0,
                assign_to: '',
                reject_reason: this.state.formdata.reject_reason,
                code: this.props.design.code,
                updated_by: this.state.formdata.updated_by
            }
        }
        axios(option)
        .then(response => {
            let sucMessage = <span><b>Data Rejected! </b>Transaction design request with code <b>{this.props.design.code}</b> is rejected by Administrator !</span>
            if (response.data.code == 200) {
                this.toggleModal()
                this.props.closeModalHandler()
                this.props.spaFunc()
                this.props.modalStatus(2, sucMessage)
            } else {
                this.props.closeModalHandler()
            }
        })
        .catch(error => {
            return error.response.data
        })
    }
    
    toggleModal = () => {
        this.setState({
            rejectModal: !this.state.rejectModal
        })
    }

    getListDesignItem = (design_id) => {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.T_DESIGN_ITEM + '/' + design_id,
            method: "GET",
            headers: {
                "authorization": token
            }
        }
        axios(option)
        .then(response => {
            if (response.data.code === 200) {
                this.setState({
                    design_item: response.data.message
                })
            } else {
                alert(response.data.message)
            }
        })
        .catch(error => {
            return error.response.data
        })
    }

    componentWillReceiveProps(data) {
        this.getListDesignItem(data.design._id)
        let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        let tmp = this.state.formdata
        tmp.assign_to = data.design.assign_to || ""
        tmp.reject_reason = data.design.reject_reason
        this.setState({
            formdata: tmp,
            staff: data.staff
        })
        let header = ""
        if (userdata.m_role_id === "RO0001") {
            if (data.design.status !== 1) {
                this.setState({
                    disableEmployee: true
                })
            } else {
                this.setState({
                    disableEmployee: false
                })
            }
            header = "Approval Design Request"
        } else if (userdata.m_role_id === "RO0002") {
            this.setState({
                disableEmployee: true
            })
            header = "Close Design Request"
        } else if (userdata.m_role_id === "RO0003") {
            header = "View Design Request"
            this.setState({
                disableEmployee: true
            })
        }
        this.setState({
            headerMessage: header
        })
    }

    render(){
        return(
            <Modal isOpen={this.props.view} className={this.props.className} size="lg">
                <ModalHeader className="bg-primary"> {this.state.headerMessage} - {this.props.design.code}) </ModalHeader>
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
                                                <input type="text" class="form-control" value={this.props.design.code} disabled />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Event Code *</td>
                                        <td style={{padding: '0 30px 0 15px'}}>:</td>
                                        <td>
                                        <div class ="input-group input-group-sm">
                                                <input type="text" class="form-control" value={this.props.design.t_event_id} disabled />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Design Title *</td>
                                        <td style={{padding: '0 30px 0 15px'}}>:</td>
                                        <td>
                                            <div class ="input-group input-group-sm">
                                                <input type="text" class="form-control" value={this.props.design.title_header} disabled />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Status</td>
                                        <td style={{padding: '0 30px 0 15px'}}>:</td>
                                        <td>
                                            <div class ="input-group input-group-sm">
                                                <input type="text" class="form-control" value={this.props.design.statusMessage} disabled />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Assign To *</td>
                                        <td style={{padding: '0 30px 0 15px'}}>:</td>
                                        <td>
                                            <select name="assign_to" onChange = {this.setAssignTo} className="form-control" disabled={this.state.disableEmployee}>
                                                <option disabled selected> - Select Employee </option>
                                                {
                                                    this.state.staff.map((el, keys) => {
                                                        if (this.state.formdata.assign_to === el.employee_id) {
                                                            return <option selected value = { el.employee_id }> { el.fullname } </option>
                                                        } else {
                                                            return <option value = { el.employee_id }> { el.fullname } </option>
                                                        }
                                                    })
                                                }   
                                            </select>
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
                                                <input type="text" class="form-control" value={this.props.design.request_by} disabled />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Request Date *</td>
                                        <td style={{padding: '0 30px 0 15px'}}>:</td>
                                        <td>
                                            <div class ="input-group input-group-sm">
                                                <input type="text" class="form-control" value={this.props.design.request_date} disabled />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Note</td>
                                        <td style={{padding: '0 30px 0 15px'}}>:</td>
                                        <td>
                                            <div class ="input-group input-group-sm">
                                                <textarea type="textarea" rows="5" name="text" class="form-control" value={this.props.design.note} disabled />
                                            </div>
                                        </td>
                                    </tr>
                                </table>    
                            </div>
                        </div>
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
                        </tr>
                        {
                            this.state.design_item.length > 0 ?
                            this.state.design_item.map((ele, keys) => {
                                return <tr className='design-req-list'>
                                    <td>
                                        <div class ="input-group input-group-sm">
                                            <input type="text" class="form-control" value={ele.list_product.name} disabled />
                                        </div>
                                    </td>
                                    <td>
                                        <div class ="input-group in put-group-sm">
                                            <input type="text" class="form-control" value={ele.list_product.description} disabled />
                                        </div>
                                    </td>
                                    <td>
                                        <div class ="input-group input-group-sm">
                                            <input type="text" class="form-control" value={ele.title_item} disabled />
                                        </div>
                                    </td>
                                    <td>
                                        <div class ="input-group input-group-sm">
                                            <input type="text" class="form-control" value={ele.request_pic} disabled />
                                        </div>
                                    </td>
                                    <td>
                                        <div class ="input-group input-group-sm">
                                            <input type="text" class="form-control" value={ele.request_due_date} disabled />
                                        </div>
                                    </td>
                                    <td>
                                        <div class ="input-group input-group-sm">
                                            <input type="text" class="form-control" value={ele.start_date} disabled />
                                        </div>
                                    </td>
                                    <td>
                                        <div class ="input-group input-group-sm">
                                            <input style={{height: '52px'}} type="text" class="form-control" value={ele.end_date} disabled />
                                        </div>
                                    </td>
                                    <td>
                                        <div class ="input-group input-group-sm">
                                            <textarea class="form-control" value={ele.note} disabled />
                                        </div>
                                    </td>
                                </tr>
                            })
                            :
                            <tr className='design-req-list'>
                                <td>
                                    <div class ="input-group input-group-sm">
                                        <input type="text" class="form-control" disabled />
                                    </div>
                                </td>
                                <td>
                                    <div class ="input-group in put-group-sm">
                                        <input type="text" class="form-control" disabled />
                                    </div>
                                </td>
                                <td>
                                    <div class ="input-group input-group-sm">
                                        <input type="text" class="form-control" disabled />
                                    </div>
                                </td>
                                <td>
                                    <div class ="input-group input-group-sm">
                                        <input type="text" class="form-control" disabled />
                                    </div>
                                </td>
                                <td>
                                    <div class ="input-group input-group-sm">
                                        <input type="text" class="form-control" disabled />
                                    </div>
                                </td>
                                <td>
                                    <div class ="input-group input-group-sm">
                                        <input type="text" class="form-control" disabled />
                                    </div>
                                </td>
                                <td>
                                    <div class ="input-group input-group-sm">
                                        <input style={{height: '52px'}} type="text" class="form-control" disabled />
                                    </div>
                                </td>
                                <td>
                                    <div class ="input-group input-group-sm">
                                        <textarea class="form-control" disabled />
                                    </div>
                                </td>
                            </tr>
                        }
                    </table>
                </ModalBody>
                <SetActionButton 
                role_id = {this.state.role_id}
                status = {this.props.design.status}
                approvedHandler = {this.approvedHandler}
                closeModalHandler = {this.props.closeModalHandler}
                rejectModal = {this.state.rejectModal}
                toggleModal = {this.toggleModal} 
                reject_reason = {this.state.formdata.reject_reason}
                rejectHandler = {this.rejectHandler}
                rejectChangeHandler = {this.rejectChangeHandler} />
            </Modal>
        )
    }
}

class SetActionButton extends React.Component {
    render() {
        if (this.props.status === 1 && this.props.role_id === "RO0001") {
            return (
                <ModalFooter>    
                    <Button color="primary" onClick = {this.props.approvedHandler}>Approved</Button>
                    <Button color="danger" onClick = {this.props.toggleModal}>Reject</Button>
                    <Button color="warning" onClick = {this.props.closeModalHandler}>Cancel</Button>
                    <RejectModal 
                        reject = {this.props.rejectModal}
                        reject_reason = {this.props.reject_reason}
                        rejectChangeHandler = {this.props.rejectChangeHandler}
                        rejectHandler = {this.props.rejectHandler}
                        close = {this.props.toggleModal} />
                </ModalFooter>
            )
        } else if (this.props.role_id === "RO0002") {
            return (
                <ModalFooter>    
                    <Button color="primary" onClick = {this.props.approvedHandler}>Close Request</Button>
                    <Button color="warning" onClick = {this.props.closeModalHandler}>Cancel</Button>
                </ModalFooter>
            )
        } else {
            return (
                <ModalFooter>    
                    <Button color="warning" onClick = {this.props.closeModalHandler}>Close</Button>
                </ModalFooter>
            )
        }
    }
}