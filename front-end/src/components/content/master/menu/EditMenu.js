import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../../configs/api.config.json'
import ConfirmModal from './ConfirmModal'

class EditMenu extends React.Component {
    constructor(props) {
        super(props)
        let userdata =JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))     
        this.state = {
            formdata: {
                code_edit: '', 
                name_edit: '',
                controller_edit: '',
                parent_id_edit: ''
            },
            updated_by: userdata.username,
            isSuccess : false,
            confirmStatus : false
        }
    }

    changeHandler = (e) => {
        let tmp = this.state.formdata
        tmp[e.target.name] = e.target.value
        this.setState({
            formdata:tmp
        })
    }

    componentWillReceiveProps(data) {
        this.setState({
            formdata: data.menu,
            isSuccess: false
        })
    }

    trimString = (str) => {
        return str.replace(/^\s+|\s+$/gm,'')
    }

    successHandler = () => {
        this.setState({
            isSuccess: true
        })
    }

    toggleModal = () => {
        this.setState({
            confirmStatus: !this.state.confirmStatus
        })
    }

    submitHandler = () => {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let tmp = this.state.formdata
        tmp.name_edit = this.trimString(this.state.formdata.name_edit)
        tmp.controller_edit = this.trimString(this.state.formdata.controller_edit)
        this.setState({
            formdata: tmp
        })
        
        if ( this.state.formdata.name_edit === "" ) {
            alert('Please add menu name first')
        } else if (this.state.formdata.controller_edit === "") {
            alert('Please add menu controller first')
        }
        else {
            this.setState({ disableStatus: true })
            let option = {
                url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.M_MENU,
                method: "put",
                headers: {
                    "authorization": token,
                    "Content-Type" : "application/json"
                },
                data: {
                    code: this.state.formdata.code_edit,
                    name: this.state.formdata.name_edit,
                    controller: this.state.formdata.controller_edit,
                    parent_id: this.state.formdata.parent_id_edit,
                    updated_by: this.state.updated_by
                }
            }
            axios(option)
            .then((response) => {
                let sucMessage = <span><b>Data Updated! </b>Data menu <b>{this.props.menu.code_edit}</b> has been updated!</span>
                let errMessage = <span>Updating data <b>{this.props.menu.code_edit}</b> unsuccessfull</span>
                if(response.data.code === 200) {
                    this.setState({ confirmStatus: false })
                    this.props.closeModalHandler()
                    this.props.spaFunc()
                    this.props.modalStatus(1, sucMessage)
                } else {
                    this.props.modalStatus(2, errMessage)
                }
                this.setState({ disableStatus: false })
            })
            .catch((error) => {
                console.log(error);            
            })
        }
    }

    render(){
        return(
            <Modal isOpen={this.props.edit} className={this.props.className}>
                <ModalHeader className="bg-primary"> Edit Menu - {this.props.oriMenu.name} ({this.state.formdata.code_edit}) </ModalHeader>
                <ModalBody>
                <table align="center">
                    <tr>
                        <td>Menu Code *</td>
                        <td style={{padding: '0 25px'}}>:</td>
                        <td>
                            <div class ="input-group">
                                <input type="text" class="form-control" disabled
                                name="code_edit" value={this.state.formdata.code_edit} onChange={this.changeHandler} required />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Menu Name *</td>
                        <td style={{padding: '0 25px'}}>:</td>
                        <td>
                            <div class ="input-group">
                                <input type="text" class="form-control" 
                                name="name_edit" value={this.state.formdata.name_edit} onChange={this.changeHandler} required/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Controller Name *</td>
                        <td style={{padding: '0 25px'}}>:</td>
                        <td>
                            <div class ="input-group">
                                <input type="text" class="form-control"
                                name="controller_edit" value={this.state.formdata.controller_edit} onChange={this.changeHandler} required />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Parent</td>
                        <td style={{padding: '0 25px'}}>:</td>
                        <td>
                            <div class ="input-group">
                                <input type="text" class="form-control" disabled 
                                name="parent_id_edit" value={this.state.formdata.parent_id_edit} onChange={this.changeHandler} required/>
                            </div>
                        </td>
                    </tr>
                </table>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick ={this.toggleModal}>Update</Button>
                    <ConfirmModal 
                        confirm = {this.state.confirmStatus}
                        successHandler = {this.successHandler}
                        closeModal = {this.toggleModal}
                        code = {this.state.formdata.code_edit} 
                        submit = {this.submitHandler} />
                    <Button color="warning" onClick={this.props.closeModalHandler}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default EditMenu