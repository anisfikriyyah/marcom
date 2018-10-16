import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class DeleteAgama extends React.Component {
    constructor(props) {
        super(props)
    }
    
    deleteHandler = () => {
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
            if (response.data.code == 200) {
                this.props.closeModalHandler()
                this.props.modalStatus(1, this.props.menu.code)
            } else {
                this.props.closeModalHandler()
                this.props.modalStatus(2, this.props.menu.code)
            }
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
                    <Button color="primary" onClick={this.deleteHandler}>Yes</Button>
                    <Button color="danger" onClick={this.props.closeModalHandler}>No</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default DeleteAgama