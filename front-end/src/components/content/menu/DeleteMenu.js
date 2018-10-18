import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class DeleteAgama extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            disableStatus: false
        }
    }
    
    deleteHandler = () => {
        this.setState({ disableStatus: true })
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.M_MENU,
            method: "delete",
            headers: {
                "authorization": token
            },
            data: {
                code: this.props.menu.code
            }
        }
        axios(option)
        .then((response) => {
            let sucMessage = <span><b>Data Deleted! </b>Data menu with code <b>{this.props.menu.code}</b> has been deleted!</span>
            let errMessage = <span>Deleting data <b>{this.props.menu.code}</b> unsuccessfull, data has a foreign key on Menu Access</span>
            if (response.data.code == 200) {
                this.props.closeModalHandler()
                this.props.spaFunc()
                this.props.modalStatus(1, sucMessage)
            } else {
                this.props.closeModalHandler()
                this.props.modalStatus(2, errMessage)
            }
            this.setState({ disableStatus: false })
        })
        .catch((error) => { 
            console.log(error)
        })
    }

    render(){
        return(
            <Modal isOpen={this.props.delete} className={this.props.className}>
                <ModalHeader className="bg-primary"> Delete Menu </ModalHeader>
                <ModalBody >
                    <p> Are you sure to delete "{this.props.menu.name}" ? </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" disabled={this.state.disableStatus} onClick={this.deleteHandler}>Yes</Button>
                    <Button color="warning" disabled={this.state.disableStatus} onClick={this.props.closeModalHandler}>No</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default DeleteAgama