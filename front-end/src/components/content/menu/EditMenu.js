import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

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
            updated_by: userdata.username
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
        })
    }

    submitHandler = () => {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
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
            if(response.data.code === 200) {
                this.props.closeModalHandler()
                alert('Success')
            } else {
                alert(response.data.message)
            }
        })
        .catch((error) => {
            console.log(error);            
        })
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
                    <Button color="primary" onClick ={this.submitHandler}>Update</Button>
                    <Button color="warning" onClick={this.props.closeModalHandler}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default EditMenu