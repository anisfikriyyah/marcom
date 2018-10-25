import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'

class ConfirmModal extends React.Component {
    render(){
        return(
            <Modal isOpen={this.props.confirm} className={this.props.className} size='sm'>
                <ModalBody>
                    Are you sure to update <b>{this.props.code}</b> ?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.props.submit}>Yes</Button>
                    <Button color="warning" onClick={this.props.closeModal}>No</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default ConfirmModal