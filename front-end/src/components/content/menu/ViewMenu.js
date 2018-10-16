import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'

class ViewMenu extends React.Component {
    render(){
        return(
            <Modal isOpen={this.props.view} className={this.props.className}>
                <ModalHeader className="bg-primary"> View Menu - Master Menu ({this.props.menu.code}) </ModalHeader>
                <ModalBody>
                    <table>
                        <tr>
                            <td>Menu Code *</td>
                            <td style={{padding: '0 30px'}}>:</td>
                            <td>
                                <div class ="input-group input-group-sm">
                                    <input type="text" class="form-control" value={this.props.menu.code} disabled />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Menu Name *</td>
                            <td style={{padding: '0 30px'}}>:</td>
                            <td>
                            <div class ="input-group input-group-sm">
                                    <input type="text" class="form-control" value={this.props.menu.name} disabled />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Controller Name *</td>
                            <td style={{padding: '0 30px'}}>:</td>
                            <td>
                                <div class ="input-group input-group-sm">
                                    <input type="text" class="form-control" value={this.props.menu.controller} disabled />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Parent</td>
                            <td style={{padding: '0 30px'}}>:</td>
                            <td>
                                <div class ="input-group input-group-sm">
                                    <input type="text" class="form-control" value={this.props.menu.parent_id} disabled />
                                </div>
                            </td>
                        </tr>
                    </table>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.props.closeModalHandler}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default ViewMenu