import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'

class ConfirmModal extends React.Component {
    render(){
        return(
            <Modal isOpen={this.props.reject} className={this.props.className} size='sm'>
                <ModalHeader className="bg-danger">
                    Reject Reason
                </ModalHeader>
                <ModalBody>
                    <textarea className="form-control" style={{width: '100%'}} name="reject_reason" onChange={this.props.rejectChangeHandler} rows="5" value={this.props.reject_reason} placeholder="Input Reject Reason" />
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.props.rejectHandler}>Reject</Button>
                    <Button color="warning" onClick={this.props.close}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default ConfirmModal