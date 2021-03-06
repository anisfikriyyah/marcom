import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../../configs/api.config.json'

class CreateMenu extends React.Component{
    constructor (props){
        super(props)
        let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        this.state = {
            formdata:{
                code : '',
                name : '',
                controller : '',
                parent_id : '',
                created_by :userdata.username
            },
            disableStatus: false
        }
    }
    changeHandler = (e) => {
        let tmp = this.state.formdata
        tmp[e.target.name]=e.target.value
        this.setState({
            formdata : tmp
        })
    }
    
    generateCode(res, cb) {
        let prior = 'ME'
        res++
        if (res < 10) {
            return cb(`${prior}000${res}`)
        } else if (res < 100) {
            return cb(`${prior}00${res}`)
        } else if (res < 1000) {
            return cb(`${prior}0${res}`)
        } else {
            return cb(`${prior}${res}`)
        }
    }

    componentWillReceiveProps(data) {
        this.generateCode(data.colLength, result => {
            let tmp = this.state.formdata
            tmp.name = ""
            tmp.controller = ""
            tmp.code = result
            this.setState({
                formdata: tmp
            })
        })
    }

    trimString = (str) => {
        return str.replace(/^\s+|\s+$/gm,'')
    }

    submitHandler = () => {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let tmp = this.state.formdata
        tmp.name = this.trimString(this.state.formdata.name)
        tmp.controller = this.trimString(this.state.formdata.controller)
        this.setState({
            formdata: tmp
        })
        
        if ( this.state.formdata.name === "" ) {
            alert('Please add menu name first')
        } else if (this.state.formdata.controller === "") {
            alert('Please add menu controller first')
        }
        else {
            this.setState({ disableStatus: true })
            let option = {
                url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.M_MENU,
                method: "post",
                headers:{
                    "authorization": token,
                    "Content-Type" : "application/json"
                },
                data: this.state.formdata
            }
            axios(option)
            .then((response)=>{
                let sucMessage = <span><b>Data Saved! </b>New menu has been add with code <b>{this.state.formdata.code} !</b></span>
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
    }

    render(){
        return(
            <Modal isOpen={this.props.show} className={this.props.className}>
                <ModalHeader className="bg-primary"> Add Menu </ModalHeader>
                <ModalBody>
                <table>
                    <tr>
                        <td>Menu Code *</td>
                        <td style={{padding: '0 30px'}}>:</td>
                        <td>
                            <div class ="input-group input-group-sm">
                                <input type="text" class="form-control"
                                name="code" value={this.state.formdata.code} disabled />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Menu Name *</td>
                        <td style={{padding: '0 30px'}}>:</td>
                        <td>
                            <div class ="input-group input-group-sm">
                                <input type="text" class="form-control" placeholder="Type Menu Name" 
                                name="name" value={this.state.formdata.name} onChange={this.changeHandler} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Controller Name *</td>
                        <td style={{padding: '0 30px'}}>:</td>
                        <td>
                            <div class ="input-group input-group-sm">
                                <input type="text" class="form-control" placeholder="Type Controller"
                                name="controller" value={this.state.formdata.controller} onChange={this.changeHandler} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Parent</td>
                        <td style={{padding: '0 30px'}}>:</td>
                        <td>
                            <div class ="input-group input-group-sm">
                                <input type="text" class="form-control" 
                                name="parent_id" />
                            </div>
                        </td>
                    </tr>
                </table>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" disabled={this.state.disableStatus} onClick = {this.submitHandler}>Save</Button>
                    <Button color="warning" disabled={this.state.disableStatus} onClick = {this.props.closeModalHandler}>Cancel</Button>
                </ModalFooter>
        </Modal>
        )
    }
}
export default CreateMenu